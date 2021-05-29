import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type Client = any;

@Injectable()
export class ClientsService {
  private readonly clients = [
    {
      systemId: 1,
      clientId: 'livonauat@nqframework.com',
      clientSecret: 'PQeX&HVHcF4eM?tM9LnL%J!44@GeKTGy',
    },
  ];

  async findOne(clientId: string): Promise<Client | undefined> {
    return this.clients.find((client) => client.clientId === clientId);
  }
}
