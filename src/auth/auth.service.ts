import { Injectable } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private clientsService: ClientsService,
    private jwtService: JwtService,
  ) {}

  async validateClient(clientId: string, clientSecret: string): Promise<any> {
    const client = await this.clientsService.findOne(clientId);
    if (client && client.clientSecret === clientSecret) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { clientSecret, ...result } = client;
      return result;
    }
    return null;
  }
  async login(client: any) {
    const payload = { clientId: client.clientId, sub: client.systemId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
