// backend/appointments-api/src/application/use-cases/AgendarConsulta.ts

import { v4 as uuid } from 'uuid';
import { IConsultaRepository } from '../../domain/repositories/IConsultaRepository';
import { Consulta } from '../../domain/entities/Consulta';

export interface AgendarConsultaRequest {
  pacienteId: string;
  medicoId: string;
  dataHora: string; // ISO string
}

export class AgendarConsulta {
  constructor(private consultaRepo: IConsultaRepository) {}

  async execute(req: AgendarConsultaRequest): Promise<Consulta> {
    const id = uuid();
    const data = new Date(req.dataHora);
    const consulta = new Consulta(id, req.pacienteId, req.medicoId, data);
    await this.consultaRepo.save(consulta);
    return consulta;
  }
}
