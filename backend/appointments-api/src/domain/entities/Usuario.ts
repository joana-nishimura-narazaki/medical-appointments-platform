// backend/appointments-api/src/domain/entities/Usuario.ts

export type Role = 'PACIENTE' | 'MEDICO' | 'ADMIN';

export class Usuario {
  constructor(
    private readonly id: string,
    private name: string,
    private email: string,
    private role: Role
  ) {}

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getRole(): Role {
    return this.role;
  }

  // Exemplo de regra de domínio:
  alterarNome(novoNome: string) {
    if (!novoNome.trim()) {
      throw new Error('Nome não pode ser vazio');
    }
    this.name = novoNome;
  }
}
