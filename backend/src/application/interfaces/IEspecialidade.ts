import { Especialidade } from "../../domain/entities/Especialidade";
import { EspecialidadeDto } from "../dtos/EspecialidadeDto";
import { Response } from "../response/Response";

export interface IEspecialidade {
  criar(dto: EspecialidadeDto): Promise<Response<Especialidade>>;
  listar(): Promise<Response<Especialidade[]>>;
  buscarPorId(id: number): Promise<Response<Especialidade>>;
  atualizar(id: number, dto: EspecialidadeDto): Promise<Response<Especialidade>>;
  deletar(id: number): Promise<Response<boolean>>;
}
