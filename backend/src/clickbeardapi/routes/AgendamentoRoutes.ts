import { Router } from "express";
import { AgendamentoController } from "../controllers/AgendamentoController";

const router = Router();
const controller = new AgendamentoController();

router.post("/", controller.criar.bind(controller));
router.put("/cancelar/:id", controller.cancelar.bind(controller));
router.get("/usuario/:usuarioId", controller.listarPorUsuario.bind(controller));
router.get("/hoje", controller.listarDiaAtual.bind(controller));
router.get("/futuros", controller.listarFuturos.bind(controller));
router.get("/horarios-disponiveis", controller.listarHorariosDisponiveis.bind(controller));

export default router;
