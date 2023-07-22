
import express from "express";
import {body} from "express-validator"
import {admin,crear, guardar} from "../controllers/propiedades.controller.js"
import { check } from "express-validator";
const router = express.Router();

router.get("/mis-propiedades",admin);
router.get("/propiedades/crear", crear);
router.post("/propiedades/crear",
    body("titulo").notEmpty().withMessage("El Titulo del Anuncio es Obligatorio"),
    body("descripcion").notEmpty().withMessage("La descripcion no puede ir vacia"),
    guardar);


export default router;