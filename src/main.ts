import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SqlService } from "./sql/sql.service";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get<ConfigService>(ConfigService);

  const options = new DocumentBuilder()
    .setTitle(config.get<string>("OPENAPI_TITLE"))
    .setDescription(config.get<string>("OPENAPI_DESCRIPTION"))
    .setVersion(config.get<string>("OPENAPI_VERSION"))
    .addTag(config.get<string>("OPENAPI_TAG"))
    .addBasicAuth({
      type: "http"
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

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
