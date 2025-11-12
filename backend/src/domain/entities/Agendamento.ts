export class Agendamento {
  constructor(
    public usuarioId: number,
    public barbeiroId: number,
    public especialidadeId: number,
    public data: Date,
    public status: string = "agendado",
    public id?: number,
    public criadoEm?: Date
  ) {}
}
