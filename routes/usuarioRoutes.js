import express from "express";
import {
  formularioLogin,
  formularioRegistro,
  formularioOlividePassword,
  registrar,
  confirmar
} from "../controllers/usuario.controller.js";

const router = express.Router();

router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);
router.post("/registro", registrar);
router.get("/confirmar/:token",confirmar);
router.get("/olvide-password", formularioOlividePassword);

export default router;
