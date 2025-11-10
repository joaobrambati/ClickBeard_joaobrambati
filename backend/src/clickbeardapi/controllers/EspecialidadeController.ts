import { Request, Response } from "express";
import { EspecialidadeService } from "../../application/services/EspecialidadeService";

/**
 * @swagger
 * tags:
 *   name: Especialidades
 *   description: Endpoints para gerenciar especialidades
 */
export class EspecialidadeController {
  private service: EspecialidadeService;

  constructor() {
    this.service = new EspecialidadeService();
  }

  /**
   * @swagger
   * /api/especialidades:
   *   get:
   *     summary: Retorna todas as especialidades
   *     tags: [Especialidades]
   *     responses:
   *       200:
   *         description: Lista de especialidades retornada com sucesso
   *       400:
   *         description: Erro ao buscar especialidades
   */
  async listar(req: Request, res: Response) {
    const resultado = await this.service.ObterTodos();
    return res.status(resultado.status ? 200 : 400).json(resultado);
  }

  /**
   * @swagger
   * /api/especialidades/{id}:
   *   get:
   *     summary: Retorna uma especialidade pelo ID
   *     tags: [Especialidades]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da especialidade
   *     responses:
   *       200:
   *         description: Especialidade encontrada
   *       404:
   *         description: Especialidade não encontrada
   */
  async buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const resultado = await this.service.ObterPorId(id);
    return res.status(resultado.status ? 200 : 404).json(resultado);
  }

  /**
   * @swagger
   * /api/especialidades:
   *   post:
   *     summary: Cria uma nova especialidade
   *     tags: [Especialidades]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *     responses:
   *       201:
   *         description: Especialidade criada com sucesso
   *       400:
   *         description: Erro ao criar especialidade
   */
  async criar(req: Request, res: Response) {
    const resultado = await this.service.Criar(req.body);
    return res.status(resultado.status ? 201 : 400).json(resultado);
  }

  /**
   * @swagger
   * /api/especialidades/{id}:
   *   put:
   *     summary: Atualiza uma especialidade existente
   *     tags: [Especialidades]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da especialidade
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *     responses:
   *       201:
   *         description: Especialidade atualizada com sucesso
   *       400:
   *         description: Erro ao atualizar especialidade
   */
  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const resultado = await this.service.Atualizar(id, req.body);
    return res.status(resultado.status ? 200 : 400).json(resultado);
  }

  /**
   * @swagger
   * /api/especialidades/{id}:
   *   delete:
   *     summary: Exclui uma especialidade
   *     tags: [Especialidades]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID da especialidade
   *     responses:
   *       200:
   *         description: Especialidade excluída com sucesso
   *       400:
   *         description: Erro ao excluir especialidade
   *       404:
   *         description: Especialidade não encontrada
   */
  async deletar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const resultado = await this.service.Deletar(id);
    return res.status(resultado.status ? 200 : 400).json(resultado);
  }
}
