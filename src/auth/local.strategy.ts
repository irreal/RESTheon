import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'clientId', passwordField: 'clientSecret' });
  }

  async validate(username: string, password: string): Promise<any> {
    const client = await this.authService.validateClient(username, password);
    if (!client) {
      throw new UnauthorizedException();
    }
    return client;
  }
}
