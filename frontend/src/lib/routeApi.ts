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
    listar: "/agendamentos",
    criar: "/agendamentos",
    deletar: (id: number) => `/agendamentos/${id}`,
  },
}
