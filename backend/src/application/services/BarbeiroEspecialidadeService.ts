import { BarbeiroEspecialidadeRepository } from "../../infrastructure/repositories/BarbeiroEspecialidadeRepository";
import { Response } from "../response/Response";

export class BarbeiroEspecialidadeService {
  private repository: BarbeiroEspecialidadeRepository;

  constructor() {
    this.repository = new BarbeiroEspecialidadeRepository();
  }

  async ObterTodos(): Promise<Response<any>> {
    try {
      const lista = await this.repository.ObterTodos();

      if (lista.length === 0)
        return { mensagem: "Nenhuma relação encontrada", status: false };

      const resultado = lista.map((item) => ({
        barbeiroId: item.barbeiro.id,
        barbeiro: item.barbeiro.nome,
        especialidadeId: item.especialidade.id,
        especialidade: item.especialidade.nome
      }));

      return {
        dados: resultado,
        mensagem: "Relações listadas com sucesso",
        status: true
      };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

  async ObterPorEspecialidade(especialidadeId: number): Promise<Response<any>> {
    try {
      const lista = await this.repository.ObterPorEspecialidade(especialidadeId);

      if (lista.length === 0)
        return { mensagem: "Nenhum barbeiro encontrado para essa especialidade", status: false };

      const resultado = {
        especialidade: lista[0].especialidade.nome,
        barbeiros: lista.map((i) => ({ id: i.barbeiro.id, nome: i.barbeiro.nome }))
      };

      return { dados: resultado, mensagem: "Barbeiros listados com sucesso", status: true };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }
}
