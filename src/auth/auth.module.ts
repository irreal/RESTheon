import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule } from '../clients/clients.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    ClientsModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('AUTH_SECRET'),
        signOptions: { expiresIn: '6000s' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
