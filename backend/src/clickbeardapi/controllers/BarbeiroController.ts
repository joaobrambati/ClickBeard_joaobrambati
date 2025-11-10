import { Request, Response } from "express";
import { BarbeiroService } from "../../application/services/BarbeiroService";

/**
 * @swagger
 * tags:
 *   name: Barbeiros
 *   description: Endpoints para gerenciar barbeiros
 */
export class BarbeiroController {
  private service: BarbeiroService;

  constructor() {
    this.service = new BarbeiroService();
  }

 /**
 * @swagger
 * /api/barbeiros:
 *   get:
 *     summary: Retorna todos os barbeiros
 *     tags: [Barbeiros]
 *     responses:
 *       200:
 *         description: Lista de barbeiros retornada com sucesso
 *       400:
 *         description: Erro ao buscar barbeiros
 */
  async listar(req: Request, res: Response) {
    const resultado = await this.service.ObterTodos();
    return res.status(resultado.status ? 200 : 400).json(resultado);
  }

  /**
 * @swagger
 * /api/barbeiros/{id}:
 *   get:
 *     summary: Retorna um barbeiro pelo ID
 *     tags: [Barbeiros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do barbeiro
 *     responses:
 *       200:
 *         description: Barbeiro encontrado
 *       404:
 *         description: Barbeiro não encontrado
 */
  async buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const resultado = await this.service.ObterPorId(id);
    return res.status(resultado.status ? 200 : 404).json(resultado);
  }

  /**
 * @swagger
 * /api/barbeiros:
 *   post:
 *     summary: Cria um novo barbeiro
 *     tags: [Barbeiros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               idade:
 *                 type: integer
 *               dataContratacao:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Barbeiro criado com sucesso
 *       400:
 *         description: Erro ao criar barbeiro
 */

  async criar(req: Request, res: Response) {
    const resultado = await this.service.Criar(req.body);
    return res.status(resultado.status ? 201 : 400).json(resultado);
  }

  /**
   * @swagger
   * /api/barbeiros/{id}:
   *   put:
   *     summary: Atualiza um barbeiro existente
   *     tags: [Barbeiros]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do barbeiro
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *               idade:
   *                 type: integer
   *               dataContratacao:
   *                 type: string
   *                 format: date-time
   *     responses:
   *       201:
   *         description: Barbeiro atualizado com sucesso
   *       400:
   *         description: Erro ao atualizar barbeiro
   */
  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const resultado = await this.service.Atualizar(id, req.body);
    return res.status(resultado.status ? 200 : 400).json(resultado);
  }

  /**
 * @swagger
 * /api/barbeiros/{id}:
 *   delete:
 *     summary: Exclui um barbeiro
 *     tags: [Barbeiros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do barbeiro
 *     responses:
 *       200:
 *         description: Barbeiro excluído com sucesso
 *       400:
 *         description: Erro ao excluir barbeiro
 *       404:
 *         description: Barbeiro não encontrado
 */
  async deletar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const resultado = await this.service.Deletar(id);
    return res.status(resultado.status ? 200 : 400).json(resultado);
  }

}