
import express from "express";
import {admin,crear} from "../controllers/propiedades.controller.js"
const router = express.Router();

router.get("/mis-propiedades",admin);
router.get("/propiedades/crear", crear)

export default router;