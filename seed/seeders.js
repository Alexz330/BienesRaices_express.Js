import {Categoria, Precio, Usuario} from "../models/index.js";

import categorias from "./categorias.js";
import precios from "./precios.js";
import usuarios from "./usuario.js";
import db from "../config/db.js";

const importarDatos = async () =>{
    try {
        //Autenticar
        await db.authenticate();
        //Generar la columnas
        await db.sync();
        //Insertamos los datos
        await Promise.all([
            Categoria.bulkCreate(categorias),
            Precio.bulkCreate(precios),
            Usuario.bulkCreate(usuarios)
        ]);
        console.log("Datos importados Correctamente");
        process.exit();
         
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
const eliminarDatos = async () =>{
    try {

        //Eliminando los datos
        //await Promise.all([Categoria.destroy({where:{},truncate:true}),Precio.destroy({where:{},truncate:true})]);
        await db.sync({force:true});

        console.log("Eliminando datos correctamente");
        process.exit();
         
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}


if(process.argv[2] === "-i"){
    importarDatos();  
}

if(process.argv[2] === "-e"){
    eliminarDatos();  
}
