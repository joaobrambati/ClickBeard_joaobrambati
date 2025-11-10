import { Especialidade } from "../../domain/entities/Especialidade";
import { EspecialidadeRepository } from "../../infrastructure/repositories/EspecialidadeRepository";
import { EspecialidadeDto } from "../dtos/EspecialidadeDto";
import { Response } from "../response/Response";

export class EspecialidadeService {
  private repository: EspecialidadeRepository;

  constructor() {
    this.repository = new EspecialidadeRepository();
  }

  async ObterTodos(): Promise<Response<Especialidade[]>> {
    try {
      const especialidades = await this.repository.ObterTodos();

      if (especialidades.length === 0)
        return { mensagem: "Nenhuma especialidade encontrada", status: false };

      return {
        dados: especialidades,
        mensagem: "Especialidades listadas com sucesso",
        status: true,
      };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

  async ObterPorId(id: number): Promise<Response<Especialidade>> {
    try {
      const especialidade = await this.repository.ObterPorId(id);

      if (!especialidade)
        return { mensagem: "Especialidade não encontrada", status: false };

      return {
        dados: especialidade,
        mensagem: "Especialidade exibida com sucesso",
        status: true,
      };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

  async Criar(dto: EspecialidadeDto): Promise<Response<Especialidade>> {
    try {
      if (!dto.nome) return { mensagem: "O nome é obrigatório", status: false };

      const novo = await this.repository.Criar({
        nome: dto.nome,
      });

      return {
        dados: novo,
        mensagem: "Especialidade criada com sucesso",
        status: true,
      };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

  async Atualizar(id: number, dto: EspecialidadeDto): Promise<Response<Especialidade>> {
    try {
      const especExistente = await this.repository.ObterPorId(id);

      if (!especExistente)
        return { mensagem: "Especialidade não encontrada", status: false };

      const atualizado = await this.repository.Atualizar(id, {
        nome: dto.nome.trim() ?? especExistente.nome.trim(),
      });

      return {
        dados: atualizado,
        mensagem: "Especialidade atualizada com sucesso",
        status: true,
      };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

  async Deletar(id: number): Promise<Response<boolean>> {
    try {
      const especialidade = await this.repository.ObterPorId(id);

      if (!especialidade)
        return { mensagem: "Especialidade não encontrada", status: false };

      await this.repository.Deletar(id);

      return {
        dados: true,
        mensagem: "Especialidade deletada com sucesso",
        status: true,
      };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }
}
