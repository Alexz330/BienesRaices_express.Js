
import express from "express";
import {body} from "express-validator"
import {admin,crear, guardar} from "../controllers/propiedades.controller.js"
import { check } from "express-validator";
const router = express.Router();

router.get("/mis-propiedades",admin);
router.get("/propiedades/crear", crear);
router.post("/propiedades/crear",
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