import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { SqlService } from "./sql/sql.service";
import { DirectSqlController } from "./direct-sql/direct-sql.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, DirectSqlController],
  providers: [SqlService],
})
export class AppModule {}
