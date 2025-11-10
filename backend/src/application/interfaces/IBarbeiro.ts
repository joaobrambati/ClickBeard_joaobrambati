import { Barbeiro } from "../../domain/entities/Barbeiro";
import { BarbeiroDto } from "../dtos/BarbeiroDto";
import { Response } from "../response/Response";

export interface IBarbeiro {
  criar(dto: BarbeiroDto): Promise<Response<Barbeiro>>;
  listar(): Promise<Response<Barbeiro[]>>;
  buscarPorId(id: number): Promise<Response<Barbeiro>>;
  atualizar(id: number, dto: BarbeiroDto): Promise<Response<Barbeiro>>;
  deletar(id: number): Promise<Response<boolean>>;
}