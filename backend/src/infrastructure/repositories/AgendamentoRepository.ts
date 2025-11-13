import context from "../data/Context";
import { Agendamento } from "../../domain/entities/Agendamento";
import { startOfTomorrow } from "date-fns";

export class AgendamentoRepository {
  async Criar(data: any): Promise<Agendamento> {
    return await context.agendamento.create({ data });
  }

  async ObterPorId(id: number): Promise<Agendamento | null> {
    return await context.agendamento.findUnique({
      where: { id },
      include: { usuario: true, barbeiro: true, especialidade: true }
    });
  }

  async ObterTodos(): Promise<Agendamento[]> {
    return await context.agendamento.findMany({
      include: { usuario: true, barbeiro: true, especialidade: true }
    });
  }

  async ObterPorBarbeiroEHorario(barbeiroId: number, data: Date): Promise<Agendamento | null> {
    return await context.agendamento.findFirst({
      where: { barbeiroId, data }
    });
  }

  async ObterPorUsuario(usuarioId: number): Promise<Agendamento[]> {
    return await context.agendamento.findMany({
      where: { usuarioId },
      include: { barbeiro: true, especialidade: true }
    });
  }

  async AtualizarStatus(id: number, status: string): Promise<Agendamento> {
    return await context.agendamento.update({
      where: { id },
      data: { status }
    });
  }

  async ObterDoDiaAtual(): Promise<Agendamento[]> {
    const inicio = new Date();
    inicio.setHours(0, 0, 0, 0);
    const fim = new Date();
    fim.setHours(23, 59, 59, 999);

    return await context.agendamento.findMany({
      where: { data: { gte: inicio, lte: fim } },
      include: { usuario: true, barbeiro: true, especialidade: true }
    });
  }

  async ObterFuturos(): Promise<Agendamento[]> {
    const amanha = startOfTomorrow();
    return await context.agendamento.findMany({
      where: { data: { gt: amanha } },
      include: { usuario: true, barbeiro: true, especialidade: true }
    });
  }

  async ObterPorBarbeiroNoDia(barbeiroId: number, data: Date): Promise<Agendamento[]> {
    const inicio = new Date(data);
    inicio.setHours(0, 0, 0, 0); // começa do dia
    const fim = new Date(data);
    fim.setHours(23, 59, 59, 999); // termina no último milissegundo

    return await context.agendamento.findMany({
      where: {
        barbeiroId,
        status: "agendado",
        data: { gte: inicio, lte: fim }
      }
    });
  }
  
}
