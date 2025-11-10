import { Usuario } from "../../domain/entities/Usuario";
import { UsuarioDto } from "../dtos/UsuarioDto";
import { Response } from "../response/Response";


export interface IUsuario {
    criar(dto: UsuarioDto): Promise<Response<Usuario>>;
    listar(): Promise<Response<Usuario[]>>;
    buscarPorId(id: number): Promise<Response<Usuario>>;
    atualizar(id: number, dto: UsuarioDto): Promise<Response<Usuario>>;
    deletar(id: number): Promise<Response<boolean>>;
}