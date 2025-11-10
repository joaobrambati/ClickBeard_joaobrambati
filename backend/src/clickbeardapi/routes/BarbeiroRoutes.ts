import { Router } from "express";
import { BarbeiroController } from "../controllers/BarbeiroController";

const router = Router();
const controller = new BarbeiroController();

router.get("/", controller.listar.bind(controller));
router.get("/:id", controller.buscarPorId.bind(controller));
router.post("/", controller.criar.bind(controller));
router.put("/:id", controller.atualizar.bind(controller));
router.delete("/:id", controller.deletar.bind(controller));

export default router;
