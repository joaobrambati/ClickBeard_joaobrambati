import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

const router = Router();
const controller = new UsuarioController();

router.get("/", controller.listar.bind(controller));
router.get("/:id", controller.buscarPorId.bind(controller));
router.post("/", controller.criar.bind(controller));
router.put("/:id", controller.atualizar.bind(controller));
router.delete("/:id", controller.deletar.bind(controller));

export default router; 