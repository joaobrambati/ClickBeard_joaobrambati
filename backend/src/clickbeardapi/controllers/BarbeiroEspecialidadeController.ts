import { Request, Response } from "express";
import { BarbeiroEspecialidadeService } from "../../application/services/BarbeiroEspecialidadeService";

/**
 * @swagger
 * tags:
 *   name: BarbeiroEspecialidade
 *   description: Endpoints para gerenciar especialidades dos barbeiros
 */
export class BarbeiroEspecialidadeController {
  private service: BarbeiroEspecialidadeService;

  constructor() {
    this.service = new BarbeiroEspecialidadeService();
  }

  /**
   * @swagger
   * /api/especialidadesBarbeiros:
   *   get:
   *     summary: Lista todas as relações de barbeiros e especialidades
   *     tags: [BarbeiroEspecialidade]
   *     responses:
   *       200:
   *         description: Lista retornada com sucesso
   *
   */
  async listar(req: Request, res: Response) {
    const resultado = await this.service.ObterTodos();
    return res.status(resultado.status ? 200 : 404).json(resultado);
  }

  /**
   * @swagger
   * /api/especialidadesBarbeiros/especialidade/{id}:
   *   get:
   *     summary: Lista os barbeiros que possuem uma especialidade específica
   *     tags: [BarbeiroEspecialidade]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID da especialidade
   *     responses:
   *       200:
   *         description: Lista retornada com sucesso
   */
  async listarPorEspecialidade(req: Request, res: Response) {
    const id = Number(req.params.id);
    const resultado = await this.service.ObterPorEspecialidade(id);
    return res.status(resultado.status ? 200 : 404).json(resultado);
  }
}
