// backend/appointments-api/src/infrastructure/repositories/DynamoConsultaRepository.ts

import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Consulta } from '../../domain/entities/Consulta';
import { IConsultaRepository } from '../../domain/repositories/IConsultaRepository';

const TABLE = process.env.CONSULTAS_TABLE!;

export class DynamoConsultaRepository implements IConsultaRepository {
  private client = new DocumentClient();

  async findById(id: string): Promise<Consulta | null> {
    const { Item } = await this.client
      .get({ TableName: TABLE, Key: { id } })
      .promise();
    if (!Item) return null;
    return new Consulta(
      Item.id,
      Item.pacienteId,
      Item.medicoId,
      new Date(Item.dataHora),
      Item.status,
      Item.exames || []
    );
  }

  async save(consulta: Consulta): Promise<void> {
    await this.client
      .put({
        TableName: TABLE,
        Item: {
          id: consulta.getId(),
          pacienteId: consulta.getPacienteId(),
          medicoId: consulta.getMedicoId(),
          dataHora: consulta.getDataHora().toISOString(),
          status: consulta.getStatus(),
          exames: consulta.getExames(),
        },
      })
      .promise();
  }
}
