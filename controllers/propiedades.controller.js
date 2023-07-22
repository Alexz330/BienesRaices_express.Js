import { validationResult } from "express-validator";
import {Categoria,Precio} from "../models/index.js"


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
        precios,
        datos:{}
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
            csrfToken:req.csrfToken(),
            precios,
            errores: resultado.array(),
            datos:req.body
        })
    }
    const {titulo, descripcion, habitaciones, estacionamiento, wc,calle, lat,lng, precio,categoria} = req.body;
    try {
        const propiedadGuardada = await Propiedad.create({
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precioId:precio,
            categoriaId:categoria,
        })
    } catch (error) {
        console.error(error);        
    }
};
