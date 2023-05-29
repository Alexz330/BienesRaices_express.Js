import { check, validationResult } from "express-validator";
import { generarId } from "../helpers/tokens.js";
import { emailRegistro } from "../helpers/email.js";

import Usuario from "../models/Usuario.js";

export const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Inciar Sesión",
  });
};

export const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear Cuenta",
  });
};

export const formularioOlividePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recupera tu acceso a Bienes Raices",
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
    token: generarId()
  });
  emailRegistro({
    nombre:usuario.nombre,
    email:usuario.email,
    token:usuario.token
  })
  //Mostrar mensage de confirmacion
  res.render("templates/mensaje",{
    pagina:"Cuenta creada Correctamente",
    mensaje:"Hemos Enviado un Email de confirmacion, presiona el enlace"
  })

};
