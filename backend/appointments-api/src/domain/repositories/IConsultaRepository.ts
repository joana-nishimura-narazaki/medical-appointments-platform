// backend/appointments-api/src/domain/repositories/IConsultaRepository.ts

import { Consulta } from '../entities/Consulta';

export interface IConsultaRepository {
  findById(id: string): Promise<Consulta | null>;
  save(consulta: Consulta): Promise<void>;
}
