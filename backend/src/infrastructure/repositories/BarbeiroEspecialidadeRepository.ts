import context from "../data/Context";

export class BarbeiroEspecialidadeRepository {
  async ObterTodos() {
    return await context.barbeiroEspecialidade.findMany({
      include: {
        barbeiro: {
          select: { id: true, nome: true }
        },
        especialidade: {
          select: { id: true, nome: true }
        }
      }
    });
  }

  async ObterPorEspecialidade(especialidadeId: number) {
    return await context.barbeiroEspecialidade.findMany({
      where: { especialidadeId },
      include: {
        barbeiro: {
          select: { id: true, nome: true }
        },
        especialidade: {
          select: { id: true, nome: true }
        }
      }
    });
  }
}
