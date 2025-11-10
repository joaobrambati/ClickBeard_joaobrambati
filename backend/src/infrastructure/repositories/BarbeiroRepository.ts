import context from "../data/Context";
import { Barbeiro } from "../../domain/entities/Barbeiro";

export class BarbeiroRepository {

  async Criar(data: Barbeiro): Promise<Barbeiro> {
    return await context.barbeiro.create({ data });
  }

  async ObterTodos(): Promise<Barbeiro[]> {
    return await context.barbeiro.findMany();
  }

  async ObterPorId(id: number): Promise<Barbeiro | null> {
    return await context.barbeiro.findUnique({ where: { id } });
  }
  
  async Atualizar(id: number, data: Partial<Barbeiro>): Promise<Barbeiro> {
    return await context.barbeiro.update({ where: { id }, data });
  }

  async Deletar(id: number): Promise<void> {
    await context.barbeiro.delete({ where: { id } });
  }

}