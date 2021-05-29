import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type Client = any;

@Injectable()
export class ClientsService {
  private readonly clients = [
    {
      systemId: 1,
      clientId: 'livona',
      clientSecret: 'test123',
    },
  ];

  async findOne(clientId: string): Promise<Client | undefined> {
    return this.clients.find((client) => client.clientId === clientId);
  }
}
