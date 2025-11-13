import { Request, Response } from "express";
import { AgendamentoService } from "../../application/services/AgendamentoService";

/**
 * @swagger
 * tags:
 *   name: Agendamentos
 *   description: Endpoints para gerenciar agendamentos
 */
export class AgendamentoController {
  private service = new AgendamentoService();

  /**
   * @swagger
   * /api/agendamentos:
   *   post:
   *     summary: Cria um novo agendamento
   *     tags: [Agendamentos]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               usuarioId:
   *                 type: integer
   *               barbeiroId:
   *                 type: integer
   *               especialidadeId:
   *                 type: integer
   *               data:
   *                 type: string
   *                 format: date-time
   *     responses:
   *       201:
   *         description: Agendamento criado com sucesso
   *       400:
   *         description: Erro ao criar o agendamento
   */
  async criar(req: Request, res: Response) {
    const resultado = await this.service.Criar(req.body);
    return res.status(resultado.status ? 201 : 400).json(resultado);
  }

  /**
   * @swagger
   * /api/agendamentos/cancelar/{id}:
   *   put:
   *     summary: Cancela um agendamento (até 2h antes)
   *     tags: [Agendamentos]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do agendamento a ser cancelado
   *     responses:
   *       200:
   *         description: Agendamento cancelado com sucesso
   *       400:
   *         description: Não foi possível cancelar o agendamento
   */
  async cancelar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const resultado = await this.service.Cancelar(id);
    return res.status(resultado.status ? 200 : 400).json(resultado);
  }

  /**
   * @swagger
   * /api/agendamentos/usuario/{usuarioId}:
   *   get:
   *     summary: Lista todos os agendamentos de um usuário
   *     tags: [Agendamentos]
   *     parameters:
   *       - in: path
   *         name: usuarioId
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Lista de agendamentos do usuário
   */
  async listarPorUsuario(req: Request, res: Response) {
    const usuarioId = Number(req.params.usuarioId);
    const resultado = await this.service.ObterPorUsuario(usuarioId);
    return res.json(resultado);
  }

  /**
   * @swagger
   * /api/agendamentos/hoje:
   *   get:
   *     summary: Lista todos os agendamentos do dia atual
   *     tags: [Agendamentos]
   *     responses:
   *       200:
   *         description: Lista de agendamentos de hoje
   */
  async listarDiaAtual(req: Request, res: Response) {
    const resultado = await this.service.ObterDoDiaAtual();
    return res.json(resultado);
  }

  /**
   * @swagger
   * /api/agendamentos/futuros:
   *   get:
   *     summary: Lista todos os agendamentos futuros
   *     tags: [Agendamentos]
   *     responses:
   *       200:
   *         description: Lista de agendamentos futuros
   */
  async listarFuturos(req: Request, res: Response) {
    const resultado = await this.service.ObterFuturos();
    return res.json(resultado);
  }

  /**
   * @swagger
   * /api/agendamentos/horarios-disponiveis:
   *   get:
   *     summary: Lista os horários disponíveis de um barbeiro em um dia específico
   *     tags: [Agendamentos]
   *     parameters:
   *       - in: query
   *         name: barbeiroId
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do barbeiro
   *       - in: query
   *         name: data
   *         schema:
   *           type: string
   *           format: date
   *         required: true
   *         description: Data para verificação dos horários disponíveis (yyyy-mm-dd)
   *     responses:
   *       200:
   *         description: Lista de horários disponíveis
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: string
   *       400:
   *         description: barbeiroId e data são obrigatórios
   */
  async listarHorariosDisponiveis(req: Request, res: Response) {
    const barbeiroId = Number(req.query.barbeiroId);
    const data = String(req.query.data); // yyyy-mm-dd

    if (!barbeiroId || !data) {
      return res.status(400).json({ mensagem: "barbeiroId e data são obrigatórios." });
    }

    const horarios = await this.service.ListarHorariosDisponiveis(barbeiroId, data);
    return res.json(horarios);
  }

}
