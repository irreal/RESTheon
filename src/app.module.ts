import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpecificPantheonService } from './specific-pantheon/specific-pantheon.service';
import { SqlService } from './sql/sql.service';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { StockController } from './stock/stock.controller';
import { StockService } from './stock/stock.service';
import { SubjectService } from './subject/subject.service';
import { SubjectController } from './subject/subject.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, ClientsModule],
  controllers: [AppController, StockController, SubjectController],
  providers: [AppService, SqlService, SpecificPantheonService, StockService, SubjectService],
})
export class AppModule {}
