import jwt from "jsonwebtoken"
import { Usuario } from "../models/index.js";

const protegerRuta = async(req,res,next)=>{
    // Verificar si hay un token
    const {_token:token} = req.cookies

    if(!token)
        return res.redirect("/auth/login")

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.scope("eliminarPassword").findByPk(decoded.id);
        // Almacenar el usuario al Req
        if(usuario){
            req.usuario = usuario;
        }else{
            return res.redirect("/auth/login");
        }
    } catch (error) {
        return res.clearCookie("_token").redirect("/auth/login")
    }
    //Comprobar el Token
    next();
};

export default protegerRuta;