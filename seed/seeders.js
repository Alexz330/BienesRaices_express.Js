import Categoria from "../models/Categoria.js";
import categorias from "./categorias.js";
import db from "../config/db.js";
const importarDatos = async () =>{
    try {
        //Autenticar
        await db.authenticate();
        //Generar la columnas
        await db.sync();
        //Insertamos los datos
        await Categoria.bulkCreate(categorias);
        console.log("Datos importados Correctamente");
        process.exit();
         
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

if(process.argv[2] === "-i"){
    importarDatos();
}