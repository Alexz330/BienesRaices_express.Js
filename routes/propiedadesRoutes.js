
import express from "express";
import {body} from "express-validator"
import {admin,crear, guardar} from "../controllers/propiedades.controller.js"

import protegerRuta from "../middleware/protejerRuta.js";
const router = express.Router();

router.get("/mis-propiedades",protegerRuta,admin);
router.get("/propiedades/crear", protegerRuta,crear);
router.post("/propiedades/crear",
        protegerRuta,
        body("titulo").notEmpty().withMessage("El Titulo del Anuncio es Obligatorio"),
        body("descripcion").notEmpty().withMessage("La descripcion no puede ir vacia").isLength({max:240}).withMessage("La descripcion es muy larga"),
        body("categoria").isNumeric().withMessage("Selecciona una categoria"),
        body("precio").isNumeric().withMessage("Selecciona un rango de precio"),
        body("estacionamiento").isNumeric().withMessage("Selecciona la Cantidad de Estacionamientos"),
        body("wc").isNumeric().withMessage("Selecciona la Cantidad de Banos"),
        body("lat").notEmpty().withMessage("Ubica la propiedad en el mapa"),
        guardar
    );


export default router;