import { AgendamentoRepository } from "../../infrastructure/repositories/AgendamentoRepository";
import { Response } from "../response/Response";
import { Agendamento } from "../../domain/entities/Agendamento";
import { AgendamentoDto } from "../dtos/AgendamentoDto";
import context from "../../infrastructure/data/Context";
import { toZonedTime } from "date-fns-tz";

export class AgendamentoService {
  private repository: AgendamentoRepository;

  constructor() {
    this.repository = new AgendamentoRepository();
  }

  async Criar(dto: AgendamentoDto): Promise<Response<Agendamento>> {
    try {
        const timeZone = "America/Sao_Paulo";
        const dataUtc = new Date(dto.data);
        const dataLocal = toZonedTime(dataUtc, timeZone);
        const hora = dataLocal.getHours();

        if (hora < 8 || hora >= 18)
        return { mensagem: "Horário fora do expediente (8h às 18h).", status: false };

        // Define o intervalo de 30 minutos do novo agendamento
        const inicio = new Date(dto.data);
        const fim = new Date(inicio.getTime() + 30 * 60 * 1000);

        // Busca agendamentos que se sobrepõem (começam antes do fim e terminam depois do início)
        const conflito = await context.agendamento.findFirst({
        where: {
            barbeiroId: dto.barbeiroId,
            status: "agendado",
            AND: [
            { data: { lt: fim } },  // começa antes de o novo terminar
            { data: { gt: new Date(inicio.getTime() - 30 * 60 * 1000) } } // termina depois que o novo começa
            ]
        }
        });

        if (conflito)
        return { mensagem: "O barbeiro já possui um agendamento neste intervalo.", status: false };

        const novo = await this.repository.Criar({
        usuarioId: dto.usuarioId,
        barbeiroId: dto.barbeiroId,
        especialidadeId: dto.especialidadeId,
        data: dto.data
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

  async ObterPorUsuario(usuarioId: number) {
    return await this.repository.ObterPorUsuario(usuarioId);
  }

  async ObterDoDiaAtual() {
    return await this.repository.ObterDoDiaAtual();
  }

  async ObterFuturos() {
    return await this.repository.ObterFuturos();
  }
}
