import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import { generarId, generarJWT } from "../helpers/tokens.js";
import { emailOlvidePassword, emailRegistro } from "../helpers/email.js";

import Usuario from "../models/Usuario.js";

export const formularioLogin = (req, res) => {
  res.render("auth/login", {
    csrfToken: req.csrfToken(),
    pagina: "Inciar Sesión",
  });
};

export const autenticar = async(req, res) =>{
  //Validacion 
  await check("email").isEmail().withMessage("El email es obligatorio").run(req);
  await check("password").notEmpty().withMessage("El password es obligatorio").run(req);
  let resultado = validationResult(req);

  // Verifcar que el usarui este vacio
  if (!resultado.isEmpty())
    return res.render("auth/login", {
      pagina: "Iniciar Sesion",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });

  const {email, password} = req.body;
  // Comprar si el usuario existe

  const usuario =  await Usuario.findOne({ where: {email}});
  


  // confirmar si el usuario existe
  if(!usuario){
    return res.render('auth/login',{
      pagina:"Iniciar Sesion",
      csrfToken: req.csrfToken(),
      errores: [{msg:"El usuario no existe"}]
    })
  }

  // Comprobar si el usuario esta confirmado

  if(!usuario.confirmado){
    return res.render('auth/login',{
      pagina:"Iniciar Sesion",
      csrfToken: req.csrfToken(),
      errores: [{msg:"Tu cuenta no ha sido confirmada"}]
    })
  }

  //Revisar usuario

  if(!usuario.verificarPassword(password)){
    return res.render('auth/login',{
      pagina:"Iniciar Sesion",
      csrfToken: req.csrfToken(),
      errores: [{msg:"Usuario o contrasena incorrecto"}]
    })
  }

  // Autenticar al usuario

  const token = generarJWT({id: usuario.id, nombre:usuario.nombre});

  return res.cookie('_token',token,{
    httpOnly:true,
    // secure:true,
    // samaSite:true,
  }).redirect('/mis-propiedades')

};

export const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear Cuenta",
    csrfToken: req.csrfToken(),
  });
};

export const formularioOlividePassword = (req, res) => {
  res.render("auth/olvide-password", {
    csrfToken: req.csrfToken(),
    pagina: "Recupera tu acceso a Bienes Raices",
  });
};

export const resetPassword = async (req, res) => {
  await check("email").isEmail().withMessage("Eso no parece un email").run(req);

  let resultado = validationResult(req);

  // Verufcar que el usarui este vacio
  if (!resultado.isEmpty())
    return res.render("auth/olvide-password", {
      pagina: "Recupera tu acceso a Bienes Raices",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });

  // Buscar el usuario
  const { email } = req.body;

  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario)
    return res.render("auth/olvide-password", {
      pagina: "Recupera tu acceso a Bienes Raices",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El Email no Pertenece a ningun usuario" }],
    });

  usuario.token = generarId();
  await usuario.save();

  emailOlvidePassword({
    email,
    nombre: usuario.nombre,
    token: usuario.token,
  });

  res.render("templates/mensaje", {
    pagina: "Reestablece tu Password",
    mensaje: "Hemos enviado un email con las instrucciones",
  });
};

export const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const usuario = await Usuario.findOne({
    where: { token },
  });

  if (!usuario)
    return res.render("auth/confirmar-cuenta", {
      pagina: "Reestablece tu password",
      mensaje: "Hubo un error al validar tu informacion, intenta de nuevo",
      error: true,
    });

  // Mostara formulario para modifcar el password
  return res.render("auth/reset-password", {
    csrfToken: req.csrfToken(),
    pagina: "Reestablece tu password",
  });

  console.log(usuario.nombre);
};

export const nuevoPassword = async (req, res) => {
  // Validar el password
  await check("password")
    .isLength({ min: 6 })
    .withMessage("El password debe de eser de al menos 6 caracteres")
    .run(req);

  let resultado = validationResult(req);

  // Verificar que el resultado este vacio
  console.log(req.body, resultado.array());
  if (!resultado.isEmpty()) {
    return res.render("auth/reset-password", {
      pagina: "Reestablece tu password",
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
    });
  }
  // Identificar quien hace el cambio

  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({
    where: { token },
  });
  //Hashear el nuevo password

  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);
  usuario.token = null;

  await usuario.save();

  res.render('auth/confirmar-cuenta',{
    pagina: "Password Reestablecido",
    mensaje:"El password se guardo correctamente"
  })
};

// Funcion que comprueba una cuenta
export const confirmar = async (req, res) => {
  const { token } = req.params;

  // Verificar si el token es valido
  const usuario = await Usuario.findOne({ where: { token } });
  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Error al confirmar cuenta",
      mensaje: "Hubo un error al confirmar tu cuenta, intenta de nuevo",
      error: true,
    });
  }
  // confirmar la cuenta
  usuario.token = null;
  usuario.confirmado = true;
  await usuario.save();

  res.render("auth/confirmar-cuenta", {
    pagina: "Cuenta Confirmada!",
    mensaje: "La cuenta se confirmó Correctamente",
  });
};

export const registrar = async (req, res) => {
  const { nombre, email, password } = req.body;

  //Validacion
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre no puede ir vacio")
    .run(req);

  await check("email").isEmail().withMessage("Eso no parece un email").run(req);

  await check("password")
    .isLength({ min: 6 })
    .withMessage("El password debe de eser de al menos 6 caracteres")
    .run(req);
  await check("repetir_password")
    .equals(password)
    .withMessage("Los passwords no son iguales")
    .run(req);

  let resultado = validationResult(req);

  // Verificar que el resultado este vacio
  console.log(req.body, resultado.array());
  if (!resultado.isEmpty()) {
    return res.render("auth/registro", {
      pagina: "Crar Cuenta",
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
      usuario: {
        nombre,
        email,
      },
    });
  }

  // Verficar que el usuario no este duplicado
  const existeUsuario = await Usuario.findOne({
    where: { email: email },
  });

  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crar Cuenta",
      errores: [{ msg: "El usuario ya esta registrado" }],
      csrfToken: req.csrfToken(),
      usuario: {
        nombre,
        email,
      },
    });
  }

  //Almacenar un usuario
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId(),
  });

  // Envio de correo de confirmacion
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  //Mostrar mensage de confirmacion
  res.render("templates/mensaje", {
    pagina: "Cuenta creada Correctamente",

    mensaje: "Hemos Enviado un Email de confirmacion, presiona el enlace",
  });
};
