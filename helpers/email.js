import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const { email, nombre, token } = datos;

  const port = process.env.PORT ?? 3000;
  const backend = process.env.BACKEND_URL;

  await transport.sendMail({
    from: "Bienesraices.com",
    to: email,
    subject: "Confirma tu cuenta en Bienes raices.com",
    text: "confirma tu cuenta en Bienesraices.com",
    html: `
            <p> Hola ${nombre}, comprueba tu cuenta en bienesRaices.com </p>
            <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace: 
            <a href="${backend}:${port}/auth/confirmar/${token}">Confirma Cuenta </a></p>
            <p> Si tu no creaste esta cuentam pudes ignorar el mensaje </p >
        `,
  });
};


export const emailOlvidePassword = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const { email, nombre, token } = datos;

  const port = process.env.PORT ?? 3000;
  const backend = process.env.BACKEND_URL;

  await transport.sendMail({
    from: "Bienesraices.com",
    to: email,
    subject: "Restablece tu Password en Bienes raices.com",
    text: "Restablece tu Password en  en Bienesraices.com",
    html: `
            <p> Hola ${nombre}, has solicitado reestablecer tu password en bienesRaices.com </p>
            <p>Sigue el siguiente enlace para generar un password nuevo: 
            <a href="${backend}:${port}/auth/olvide-password/${token}">Reestablecer Password</a></p>
            <p> Si tu no solicitaste el cambio de password, puedes ignorar el mensaje </p >
        `,
  });
};
