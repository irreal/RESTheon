import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpecificPantheonService } from './specific-pantheon/specific-pantheon.service';
import { SqlService } from './sql/sql.service';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService, SqlService, SpecificPantheonService],
})
export class AppModule {}
