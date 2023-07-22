import { validationResult } from "express-validator";


import Precio from "../models/Precio.js";
import Categoria from "../models/Categoria.js";

export const  admin = (req,res)=>{
    res.render("propiedades/admin",{
        pagina:"Mis propiedades",
        barra:true
    })
};

// Formulario para cerar una propiedad
export const crear = async (req,res)=>{

    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll(),
    ]);
    
    res.render("propiedades/crear",{
        pagina:"Crear Propiedad",
        barra:true,
        csrfToken:req.csrfToken(),
        categorias,
        precios
    })
};

export const  guardar =  async (req,res) =>{
    //Validacion
    let resultado = validationResult(req);

    if(!resultado.isEmpty()){
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll(),
        ]);
        
        return res.render("propiedades/crear",{
            pagina:"Crear Propiedad",
            barra:true,
            categorias,
            precios,
            errores: resultado.array(),
        })
    }
};
