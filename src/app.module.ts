import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { SqlService } from "./sql/sql.service";
import { DirectSqlController } from "./direct-sql/direct-sql.controller";
import { SpecificPantheonService } from './specific-pantheon/specific-pantheon.service';
import { UsingHelperServiceController } from './using-helper-service/using-helper-service.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, DirectSqlController, UsingHelperServiceController],
  providers: [SqlService, SpecificPantheonService],
})
export class AppModule {}
