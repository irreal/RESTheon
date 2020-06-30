import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SqlService } from "./sql/sql.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sql = app.get(SqlService);
  try {
    await sql.connectToSql();
    await app.listen(3000);
  } catch (err) {
    console.log("App initialization failed.", err);
    process.exit(1);
  }
}
bootstrap();
