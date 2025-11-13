import { AgendamentoRepository } from "../../infrastructure/repositories/AgendamentoRepository";
import { Response } from "../response/Response";
import { Agendamento } from "../../domain/entities/Agendamento";
import { AgendamentoDto } from "../dtos/AgendamentoDto";
import context from "../../infrastructure/data/Context";
import { toZonedTime, format } from "date-fns-tz";

export class AgendamentoService {
  private repository: AgendamentoRepository;

  constructor() {
    this.repository = new AgendamentoRepository();
  }

  async Criar(dto: AgendamentoDto): Promise<Response<Agendamento>> {
    try {
      const timeZone = "America/Sao_Paulo";

      // Converte a data recebida (horário local) para UTC
      const dataLocal = new Date(dto.data); // ex: "2025-11-13T09:00:00"
      const offset = dataLocal.getTimezoneOffset() * 60000; // diferença em ms
      const dataUtc = new Date(dataLocal.getTime() - offset);

      const horaLocal = dataLocal.getHours();
      if (horaLocal < 8 || horaLocal >= 18) {
        return { mensagem: "Horário fora do expediente (8h às 18h).", status: false };
      }

      // Define o intervalo de 30 minutos do novo agendamento
      const inicio = dataUtc;
      const fim = new Date(inicio.getTime() + 30 * 60 * 1000);

      // Busca agendamentos que se sobrepõem
      const conflito = await context.agendamento.findFirst({
        where: {
          barbeiroId: dto.barbeiroId,
          status: "agendado",
          AND: [
            { data: { lt: fim } },  // começa antes de terminar
            { data: { gt: new Date(inicio.getTime() - 30 * 60 * 1000) } } // termina depois de começar
          ]
        }
      });

      if (conflito) {
        return { mensagem: "O barbeiro já possui um agendamento neste intervalo.", status: false };
      }

      // Cria o agendamento usando UTC
      const novo = await this.repository.Criar({
        usuarioId: dto.usuarioId,
        barbeiroId: dto.barbeiroId,
        especialidadeId: dto.especialidadeId,
        data: dataUtc
      });

      return { dados: novo, mensagem: "Agendamento criado com sucesso!", status: true };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

  async Cancelar(id: number): Promise<Response<boolean>> {
    try {
      const agendamento = await this.repository.ObterPorId(id);
      if (!agendamento)
        return { mensagem: "Agendamento não encontrado.", status: false };

      const diferenca = (agendamento.data.getTime() - new Date().getTime()) / (1000 * 60 * 60);
      if (diferenca < 2)
        return { mensagem: "Cancelamento permitido apenas até 2h antes do horário.", status: false };

      await this.repository.AtualizarStatus(id, "cancelado");
      return { dados: true, mensagem: "Agendamento cancelado com sucesso.", status: true };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

  async ObterPorUsuario(usuarioId: number): Promise<Response<Agendamento[]>> {
    try {
      const agendamentos = await this.repository.ObterPorUsuario(usuarioId);
      
      if (agendamentos.length === 0)
        return { mensagem: "Nenhum agendamento encontrado", status: false }; 

      return { dados: agendamentos, mensagem: "Agendamentos listados com sucesso", status: true };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

  async ObterDoDiaAtual(): Promise<Response<Agendamento[]>> {
    try {
      const agendamentos = await this.repository.ObterDoDiaAtual();
      
      if (agendamentos.length === 0)
        return { mensagem: "Nenhum agendamento encontrado", status: false }; 

      return { dados: agendamentos, mensagem: "Agendamentos listados com sucesso", status: true };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

  async ObterFuturos(): Promise<Response<Agendamento[]>> {
    try {
      const agendamentos = await this.repository.ObterFuturos();
      
      if (agendamentos.length === 0)
        return { mensagem: "Nenhum agendamento encontrado", status: false }; 

      return { dados: agendamentos, mensagem: "Agendamentos listados com sucesso", status: true };
    } catch (error) {
      return { mensagem: (error as Error).message, status: false };
    }
  }

  async ListarHorariosDisponiveis(barbeiroId: number, dataStr: string): Promise<string[]> {
  const timeZone = "America/Sao_Paulo";

  // Parse da data (yyyy-mm-dd) para criar o dia local
  const [ano, mes, dia] = dataStr.split("-").map(Number);

  // Cria todos os horários do expediente (8h às 18h, intervalos de 30min)
  const horarios: string[] = [];
  for (let h = 8; h < 18; h++) {
    horarios.push(`${h.toString().padStart(2, "0")}:00`);
    horarios.push(`${h.toString().padStart(2, "0")}:30`);
  }

  // Pega agendamentos do dia
  const dataInicio = new Date(ano, mes - 1, dia, 0, 0, 0);
  const dataFim = new Date(ano, mes - 1, dia, 23, 59, 59);

  const agendamentos = await this.repository.ObterPorBarbeiroNoDia(barbeiroId, dataInicio);

  // Filtra horários disponíveis
  const horariosDisponiveis = horarios.filter(h => {
    const [hora, minuto] = h.split(":").map(Number);

    // Cria horário local
    const inicioHorarioLocal = new Date(ano, mes - 1, dia, hora, minuto);

    // Converte para UTC usando toZonedTime (para comparar com banco que está em UTC)
    const inicioHorarioUTC = new Date(inicioHorarioLocal.getTime() - inicioHorarioLocal.getTimezoneOffset() * 60000);
    const fimHorarioUTC = new Date(inicioHorarioUTC.getTime() + 30 * 60 * 1000);

    // Verifica conflitos
    const conflito = agendamentos.some(agendamento => {
      const inicioAgendamentoUTC = agendamento.data; // já em UTC
      const fimAgendamentoUTC = new Date(inicioAgendamentoUTC.getTime() + 30 * 60 * 1000);
      return inicioHorarioUTC < fimAgendamentoUTC && fimHorarioUTC > inicioAgendamentoUTC;
    });

    return !conflito;
  });

  return horariosDisponiveis;
}

}
