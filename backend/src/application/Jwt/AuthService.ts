import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UsuarioRepository } from "../../infrastructure/repositories/UsuarioRepository";
import { Response } from "../response/Response";
import { Usuario } from "../../domain/entities/Usuario";

export class AuthService {
  private usuarioRepository: UsuarioRepository;

  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  async registrar(
    nome: string,
    email: string,
    senha: string,
    tipo: "cliente" | "admin" = "cliente"
  ): Promise<Response<Usuario>> {
    try {
      const usuarioExistente = await this.usuarioRepository.ObterPorEmail(
        email
      );
      if (usuarioExistente) throw new Error("E-mail já cadastrado");

      const senhaHash = await bcrypt.hash(senha, 10);

      const novoUsuario = await this.usuarioRepository.Criar({
        nome,
        email,
        senha: senhaHash,
        tipo,
      } as any);

      const { senha: _, ...usuarioSemSenha } = novoUsuario;

      return { dados: usuarioSemSenha as Usuario, mensagem: "Usuário registrado com sucesso", status: true };
    } catch (error) {
      return { status: false, mensagem: (error as Error).message };
    }
  }

  async login(email: string, senha: string): Promise<Response<any>> {
  try {
    const usuario = await this.usuarioRepository.ObterPorEmail(email);
    if (!usuario)
      return { status: false, mensagem: "Usuário não encontrado" };

    const senhaHash = usuario.senha || "";

    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if (!senhaValida)
      return { status: false, mensagem: "Senha incorreta" };

    const token = (jwt as any).sign(
      { id: usuario.id, tipo: usuario.tipo },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    const { senha: _, ...usuarioSemSenha } = usuario;

    return {
      dados: { token, usuario: usuarioSemSenha },
      mensagem: "Login realizado com sucesso",
      status: true
    };
  } catch (error) {
    return { status: false, mensagem: (error as Error).message };
  }
}

  
}
