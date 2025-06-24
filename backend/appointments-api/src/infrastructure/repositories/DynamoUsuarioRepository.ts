// backend/appointments-api/src/infrastructure/repositories/DynamoUsuarioRepository.ts

import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { v4 as uuid } from 'uuid';
import { Usuario } from '../../domain/entities/Usuario';
import { IUsuarioRepository } from '../../domain/repositories/IUsuarioRepository';

const TABLE = process.env.USUARIOS_TABLE!;

export class DynamoUsuarioRepository implements IUsuarioRepository {
  private client = new DocumentClient();

  async findById(id: string): Promise<Usuario | null> {
    const { Item } = await this.client
      .get({ TableName: TABLE, Key: { id } })
      .promise();
    if (!Item) return null;
    return new Usuario(Item.id, Item.name, Item.email, Item.role);
  }

  async save(usuario: Usuario): Promise<void> {
    await this.client
      .put({
        TableName: TABLE,
        Item: {
          id: usuario.getId(),
          name: usuario.getName(),
          email: usuario.getEmail(),
          role: usuario.getRole(),
        },
      })
      .promise();
  }
}
