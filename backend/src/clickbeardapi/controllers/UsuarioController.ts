import { Request, Response } from "express";
import { UsuarioService } from "../../application/services/UsuarioService";

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints para gerenciar usuários
 */
export class UsuarioController {
  private service: UsuarioService;

  constructor() {
    this.service = new UsuarioService();
  }

  /**
   * @swagger
   * /api/usuarios:
   *   get:
   *     summary: Retorna todos os usuários
   *     tags: [Usuários]
   *     responses:
   *       200:
   *         description: Lista de usuários retornada com sucesso
   *       400:
   *         description: Erro ao buscar usuários
   */
  async listar(req: Request, res: Response) {
    const resultado = await this.service.ObterTodos();
    return res.status(resultado.status ? 200 : 400).json(resultado);
  }

  /**
   * @swagger
   * /api/usuarios/{id}:
   *   get:
   *     summary: Retorna um usuário pelo ID
   *     tags: [Usuários]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Usuário encontrado
   *       404:
   *         description: Usuário não encontrado
   */
  async buscarPorId(req: Request, res: Response) {
    const id = Number(req.params.id);
    const resultado = await this.service.ObterPorId(id);
    return res.status(resultado.status ? 200 : 404).json(resultado);
  }

  /**
   * @swagger
   * /api/usuarios:
   *   post:
   *     summary: Cria um novo barbeiro
   *     tags: [Usuários]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *               email:
   *                 type: string
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *       400:
   *         description: Erro ao criar usuário
   */
  async criar(req: Request, res: Response) {
    const resultado = await this.service.Criar(req.body);
    return res.status(resultado.status ? 201 : 400).json(resultado);
  }

  /**
   * @swagger
   * /api/usuarios/{id}:
   *   put:
   *     summary: Atualiza um usuário existente
   *     tags: [Usuários]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do usuário
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nome:
   *                 type: string
   *               email:
   *                 type: string
   *     responses:
   *       201:
   *         description: Usuário atualizado com sucesso
   *       400:
   *         description: Erro ao atualizar usuário
   */
  async atualizar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const resultado = await this.service.Atualizar(id, req.body);
    return res.status(resultado.status ? 200 : 400).json(resultado);
  }

  /**
   * @swagger
   * /api/usuarios/{id}:
   *   delete:
   *     summary: Exclui um usuário
   *     tags: [Usuários]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Usuário excluído com sucesso
   *       400:
   *         description: Erro ao excluir usuário
   *       404:
   *         description: Usuário não encontrado
   */
  async deletar(req: Request, res: Response) {
    const id = Number(req.params.id);
    const resultado = await this.service.Deletar(id);
    return res.status(resultado.status ? 200 : 400).json(resultado);
  }

}
