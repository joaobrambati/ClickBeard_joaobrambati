import { TipoUsuario } from "@prisma/client";

export class Usuario {
  constructor(
      public nome: string,
      public email: string,
      public tipo: TipoUsuario,
      public id?: number
  ) {}
}
