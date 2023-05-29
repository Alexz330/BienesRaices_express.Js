import nodemailer from "nodemailer"

export const emailRegistro = async (datos) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      const {email, nombre, token} = datos;

      await transport.sendMail({
        from:"Bienesraices.com",
        to:email,
        subject:"Confirma tu cuenta en Bienes raices.com",
        text:"confirma tu cuenta en Bienesraices.com",
        html:`
            <p> Hola ${nombre}, comprueba tu cuenta en bienesRaices.com </p>
            <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace: 
            <a href="">Confirma Cuenta </a></p>
            <p> Si tu no creaste esta cuentam pudes ignorar el mensaje </p >
        `  

      })
}