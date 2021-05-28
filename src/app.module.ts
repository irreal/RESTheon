import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpecificPantheonService } from './specific-pantheon/specific-pantheon.service';
import { SqlService } from './sql/sql.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, SqlService, SpecificPantheonService],
})
export class AppModule {}
