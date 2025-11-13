import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/registrar",
  },
  usuarios: {
    listar: "/usuarios",
    buscarPorId: (id: number) => `/usuarios/${id}`,
  },
  agendamentos: {
    listarHoje: "/agendamentos/hoje",
    listarFuturo: "/agendamentos/futuros",
    listarUsuario: (id: number) => `/agendamentos/usuario/${id}`,
    criar: "/agendamentos",
    cancelar: (id: number) => `/agendamentos/cancelar/${id}`,
    horariosDisponiveis: (barbeiroId: number, data: string) =>
      `/agendamentos/horarios-disponiveis?barbeiroId=${barbeiroId}&data=${data}`,
  },
  barbeiros: {
    listar: "/barbeiros",
    excluir: (id: number) => `/barbeiros/${id}`
  },
  especialidades: {
    listar: "/especialidades"
  },
  barbeirosEspecialidade: {
    especialidadeEspecifica: (id: number) => `/especialidadesBarbeiros/especialidade/${id}`
  }
}
