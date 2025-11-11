import context from "../data/Context";
import { Usuario } from "../../domain/entities/Usuario";


export class UsuarioRepository {

  async Criar(data: Usuario): Promise<Usuario> {
    return await context.usuario.create({ data });
  }  

  async ObterTodos(): Promise<Usuario[]> {
    return await context.usuario.findMany();
  }

  async ObterPorId(id: number): Promise<Usuario | null> {
    return await context.usuario.findUnique({ where: { id } });
  }
  
  async Atualizar(id: number, data: Partial<Usuario>): Promise<Usuario> {
    return await context.usuario.update({ where: { id }, data });
  }

  async Deletar(id: number): Promise<void> {
    await context.usuario.delete({ where: { id } });
  } 
    
}