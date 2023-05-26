import { check, validationResult } from "express-validator";

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
  //Validacion
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre nno puede ir vacio")
    .run(req);

  await check("email").isEmail().withMessage("Eso no parece un email").run(req);

  await check("password")
    .isLength({ min: 6 })
    .withMessage("El password debe de eser de al menos 6 caracteres")
    .run(req);
  await check("repetir_password")
    .equals(req.body.password)
    .withMessage("Los passwords no son iguales")
    .run(req);
  // await check("repetir_password")
  //   .equals("password")
  //   .withMessage("Los Passwords no son iguales")
  //   .run(req);

  let resultado = validationResult(req);
  // Verificar que el resultado este vacio
  console.log(req.body, resultado.array());
  if (!resultado.isEmpty()) {
    return res.render("auth/registro", {
      pagina: "Crar Cuenta",
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  // Verficar que el usuario no este duplicado
  const existeUsuario = await Usuario.findOne({
    where: { email: req.body.email },
  });

  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crar Cuenta",
      errores: [{ msg: "El usuario ya esta registrado" }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }
  const usuario = await Usuario.create(req.body);
  res.json(usuario);
  return;
};
