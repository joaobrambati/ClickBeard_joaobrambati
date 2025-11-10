import { Usuario } from "../../domain/entities/Usuario";
import { UsuarioRepository } from "../../infrastructure/repositories/UsuarioRepository";
import { UsuarioDto } from "../dtos/UsuarioDto";
import { Response } from "../response/Response";

export class UsuarioService {
  private repository: UsuarioRepository;

  constructor() {
    this.repository = new UsuarioRepository();
  }

  async ObterTodos(): Promise<Response<Usuario[]>> {
    try {
      const usuarios = await this.repository.ObterTodos();

      if (usuarios.length === 0)
        return { mensagem: "Nenhum usuário encontrado", status: false };

      return {
        dados: usuarios,
        mensagem: "Usuários listados com sucesso",
        status: true,
      };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

  async ObterPorId(id: number): Promise<Response<Usuario>> {
    try {
      const usuario = await this.repository.ObterPorId(id);

      if (!usuario)
        return { mensagem: "Usuário não encontrado", status: false };

      return {
        dados: usuario,
        mensagem: "Usuário exibido com sucesso",
        status: true,
      };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

  async Criar(dto: UsuarioDto): Promise<Response<Usuario>> {
    try {
      if (!dto.nome) return { mensagem: "O nome é obrigatório", status: false };

      const novo = await this.repository.Criar({
        nome: dto.nome,
        email: dto.email,
        tipo: dto.tipo,
      });

      return {
        dados: novo,
        mensagem: "Usuário criado com sucesso",
        status: true,
      };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

  async Atualizar(id: number, dto: UsuarioDto): Promise<Response<Usuario>> {
      try {
        const usuarioExistente = await this.repository.ObterPorId(id);
  
        if (!usuarioExistente)
          return { mensagem: "Usuário não encontrado", status: false };
  
        const atualizado = await this.repository.Atualizar(id, {
          nome: dto.nome.trim() ?? usuarioExistente.nome.trim(),
          email: dto.email.trim() ?? usuarioExistente.email.trim(),
          tipo: dto.tipo ?? usuarioExistente.tipo,
        });
  
        return { dados: atualizado, mensagem: "Usuário atualizado com sucesso", status: true };
      } catch (error) {
        return { mensagem: (error as Error).message, status: false };
      }
  }

  async Deletar(id: number): Promise<Response<boolean>> {
    try {
      const usuario = await this.repository.ObterPorId(id);

      if (!usuario)
        return { mensagem: "Usuário não encontrado", status: false };

      await this.repository.Deletar(id);

      return { dados: true, mensagem: "Usuário deletado com sucesso", status: true };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

}
