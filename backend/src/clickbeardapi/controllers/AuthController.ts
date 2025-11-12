import { Request, Response } from "express";
import { AuthService } from "../../application/Jwt/AuthService";

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints para autenticação de usuários
 */
export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * @swagger
   * /api/auth/registrar:
   *   post:
   *     summary: Registra um novo usuário
   *     tags: [Autenticação]
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
   *               senha:
   *                 type: string
   *               tipo:
   *                 type: string
   *                 enum: [cliente, admin]
   *     responses:
   *       201:
   *         description: Usuário registrado com sucesso
   *       400:
   *         description: Erro ao registrar o usuário
   */
  async registrar(req: Request, res: Response) {
    try {
      const { nome, email, senha, tipo } = req.body;
      const novoUsuario = await this.authService.registrar(nome, email, senha, tipo);
      res.status(201).json(novoUsuario);
    } catch (erro: any) {
      res.status(400).json({ mensagem: erro.message });
    }
  }

  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Realiza login de um usuário
   *     tags: [Autenticação]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               senha:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login realizado com sucesso
   *       400:
   *         description: Erro ao realizar login
   */
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const resultado = await this.authService.login(email, senha);
      res.status(200).json(resultado);
    } catch (erro: any) {
      res.status(400).json({ mensagem: erro.message });
    }
  }
}
