import express from "express";
import {
  formularioLogin,
  formularioRegistro,
  formularioOlividePassword,
  registrar,
  confirmar,
  resetPassword,
  comprobarToken,
  nuevoPassword
} from "../controllers/usuario.controller.js";

const router = express.Router();

router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);
router.post("/registro", registrar);
router.get("/confirmar/:token",confirmar);

router.get("/olvide-password", formularioOlividePassword);
router.post("/olvide-password", resetPassword);

// Almacena el nuevo password
router.get("/olvide-password/:token", comprobarToken);
router.get("/olvide-password/:token", nuevoPassword);

export default router;
