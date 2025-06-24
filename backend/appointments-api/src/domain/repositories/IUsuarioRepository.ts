// backend/appointments-api/src/domain/repositories/IUsuarioRepository.ts

import { Usuario } from '../entities/Usuario';

export interface IUsuarioRepository {
  findById(id: string): Promise<Usuario | null>;
  save(usuario: Usuario): Promise<void>;
}