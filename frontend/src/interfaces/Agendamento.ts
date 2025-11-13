export interface Agendamento {
  id?: number;
  usuarioId: number;
  barbeiroId: number;
  especialidadeId: number;
  data: string;
  status: "agendado" | "cancelado" | string;
  criadoEm?: string;

  usuario?: {
    id: number;
    nome: string;
    email: string;
    tipo: string;
  };
  barbeiro?: {
    id: number;
    nome: string;
    idade?: number;
    dataContratacao?: string;
  };
  especialidade?: {
    id: number;
    nome: string;
  };
}
