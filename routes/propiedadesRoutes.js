
import express from "express";
import {body} from "express-validator"
import {admin,crear, guardar} from "../controllers/propiedades.controller.js"
import { check } from "express-validator";
const router = express.Router();

router.get("/mis-propiedades",admin);
router.get("/propiedades/crear", crear);
router.get("/propiedades/crear",
    body("titulo").notEmpty().withMessage("El Titulo del Anuncio es Obligatorio")
    , guardar);


export default router;