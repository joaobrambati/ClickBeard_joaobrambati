import context from "../data/Context";
import { Especialidade } from "../../domain/entities/Especialidade";

export class EspecialidadeRepository {
  async Criar(data: Especialidade): Promise<Especialidade> {
    return await context.especialidade.create({ data });
  }

  async ObterTodos(): Promise<Especialidade[]> {
    return await context.especialidade.findMany();
  }

  async ObterPorId(id: number): Promise<Especialidade | null> {
    return await context.especialidade.findUnique({ where: { id } });
  }

  async Atualizar(id: number, data: Partial<Especialidade>): Promise<Especialidade> {
    return await context.especialidade.update({ where: { id }, data });
  }

  async Deletar(id: number): Promise<void> {
    await context.especialidade.delete({ where: { id } });
  }
}
