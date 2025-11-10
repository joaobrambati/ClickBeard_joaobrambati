export class Barbeiro {
  constructor(
    public nome: string,
    public idade: number | null,
    public dataContratacao: Date,
    public id?: number,
  ) {}
}
