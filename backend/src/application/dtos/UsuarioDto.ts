import { TipoUsuario } from "@prisma/client";

export interface UsuarioDto {
  nome: string;
  email: string;
  tipo: TipoUsuario;
}