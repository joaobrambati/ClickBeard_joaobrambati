import context from "../data/Context";
import { Barbeiro } from "../../domain/entities/Barbeiro";

export class BarbeiroRepository {

  async Criar(data: any): Promise<Barbeiro> {
    const { especialidadeIds, ...barbeiroData } = data;

    return await context.barbeiro.create({
      data: {
        ...barbeiroData,
        especialidades: especialidadeIds
          ? {
              create: especialidadeIds.map((id: number) => ({
                especialidade: { connect: { id } },
              })),
            }
          : undefined,
      },
      include: {
        especialidades: { include: { especialidade: true } },
      },
    });
  }

  async ObterTodos(): Promise<Barbeiro[]> {
    return await context.barbeiro.findMany({
      include: {
        especialidades: { include: { especialidade: true } },
      },
    });
  }

  async ObterPorId(id: number): Promise<Barbeiro | null> {
    return await context.barbeiro.findUnique({
      where: { id },
      include: {
        especialidades: { include: { especialidade: true } },
      },
    });
  }
  
  async Atualizar(id: number, data: any): Promise<Barbeiro> {
    const { especialidadeIds, ...barbeiroData } = data;

    return await context.barbeiro.update({
      where: { id },
      data: {
        ...barbeiroData,
        ...(especialidadeIds && {
          especialidades: {
            deleteMany: {},
            create: especialidadeIds.map((id: number) => ({
              especialidade: { connect: { id } },
            })),
          },
        }),
      },
      include: {
        especialidades: { include: { especialidade: true } },
      },
    });
  }

  async Deletar(id: number): Promise<void> {
    await context.barbeiro.delete({ where: { id } });
  }

}