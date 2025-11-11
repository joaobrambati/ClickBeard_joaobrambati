import { BarbeiroEspecialidade } from "../../domain/entities/BarbeiroEspecialidade";
import { Response } from "../response/Response";

export interface IBarbeiroEspecialidade {
  listar(): Promise<Response<BarbeiroEspecialidade[]>>;
  buscarPorId(id: number): Promise<Response<BarbeiroEspecialidade>>;
}
