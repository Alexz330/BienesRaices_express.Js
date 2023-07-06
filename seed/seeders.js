import Categoria from "../models/Categoria.js";
import categorias from "./categorias.js";
import Precio from "../models/Precio.js";
import precios from "./precios.js";
import db from "../config/db.js";
const importarDatos = async () =>{
    try {
        //Autenticar
        await db.authenticate();
        //Generar la columnas
        await db.sync();
        //Insertamos los datos
        await Promise.all([Categoria.bulkCreate(categorias),Precio.bulkCreate(precios)]);
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