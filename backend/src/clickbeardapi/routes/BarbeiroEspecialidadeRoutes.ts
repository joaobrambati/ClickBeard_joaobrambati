import { Router } from "express";
import { BarbeiroEspecialidadeController } from "../controllers/BarbeiroEspecialidadeController";

const router = Router();
const controller = new BarbeiroEspecialidadeController();

router.get("/", controller.listar.bind(controller));
router.get("/especialidade/:id", controller.listarPorEspecialidade.bind(controller));

export default router;
