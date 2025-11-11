import { BarbeiroRepository } from "../../infrastructure/repositories/BarbeiroRepository";
import { Response } from "../response/Response";
import { Barbeiro } from "../../domain/entities/Barbeiro";
import { BarbeiroDto } from "../dtos/BarbeiroDto";

export class BarbeiroService {
  private repository: BarbeiroRepository;

  constructor() {
    this.repository = new BarbeiroRepository();
  }

  async ObterTodos(): Promise<Response<Barbeiro[]>> {
    try {
      const barbeiros = await this.repository.ObterTodos();

      if (barbeiros.length === 0)
        return { mensagem: "Nenhum barbeiro encontrado", status: false };

      return { dados: barbeiros, mensagem: "Barbeiros listados com sucesso", status: true };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

  async ObterPorId(id: number): Promise<Response<Barbeiro>> {
    try{
        const barbeiro = await this.repository.ObterPorId(id);

        if (!barbeiro)
            return { mensagem: "Barbeiro não encontrado", status: false };

        return { dados: barbeiro, mensagem: "Barbeiro exibido com sucesso", status: true };
    } catch (error){
        return { mensagem: (error as Error).message, status: false };
    }
  }

  async Criar(dto: BarbeiroDto): Promise<Response<Barbeiro>> {
    try {
      if (!dto.nome)
        return { mensagem: "O nome é obrigatório", status: false };

      const novo = await this.repository.Criar({
        nome: dto.nome,
        idade: dto.idade,
        dataContratacao: dto.dataContratacao,
        especialidadeIds: dto.especialidadeIds,
      });

      return { dados: novo, mensagem: "Barbeiro criado com sucesso", status: true };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

  async Atualizar(id: number, dto: BarbeiroDto): Promise<Response<Barbeiro>> {
    try {
      const barbeiroExistente = await this.repository.ObterPorId(id);

      if (!barbeiroExistente)
        return { mensagem: "Barbeiro não encontrado", status: false };

      const atualizado = await this.repository.Atualizar(id, {
        nome: dto.nome.trim() ?? barbeiroExistente.nome.trim(),
        idade: dto.idade ?? barbeiroExistente.idade,
        dataContratacao: dto.dataContratacao ?? barbeiroExistente.dataContratacao,
        especialidadeIds: dto.especialidadeIds
      });

      return { dados: atualizado, mensagem: "Barbeiro atualizado com sucesso", status: true };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

  async Deletar(id: number): Promise<Response<boolean>> {
    try {
      const barbeiro = await this.repository.ObterPorId(id);

      if (!barbeiro)
        return { mensagem: "Barbeiro não encontrado", status: false };

      await this.repository.Deletar(id);

      return { dados: true, mensagem: "Barbeiro deletado com sucesso", status: true };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

}