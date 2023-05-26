import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js"
import db from "./config/db.js";

//Crear la app
const app =  express();


// Habilitar lectura de datos de formularios
app.use(express.urlencoded({extended:true}))

//Conexión a la base da datos
try {
    await db.authenticate();
    db.sync()
    console.log("Conexión Correcta a la Base de datos");
} catch (a) {
    console.log(a)
    
}

// Habilitando pug
app.set("view engine","pug")
app.set("views","./views")

// Carpeta Pública
app.use(express.static("public"))

//Routing
app.use("/auth",usuarioRoutes)



const port = 3000;
app.listen(port,()=>{

    console.log(`servidor escuchando en el puero ${port}`)
})