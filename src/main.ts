import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SqlService } from './sql/sql.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('V1');
  const config = app.get(ConfigService);
  const sql = app.get(SqlService);
  try {
    await sql.connectToSql();
    await app.listen(config.get('PORT', 3000));
  } catch (err) {
    console.log('App initialization failed.', err);
    process.exit(1);
  }
}
bootstrap();
