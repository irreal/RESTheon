import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SpecificPantheonService } from './specific-pantheon/specific-pantheon.service';
import { SqlService } from './sql/sql.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private sql: SqlService,
    private pantheon: SpecificPantheonService,
  ) {
    this.sql.connectToSql().then(() => {
      this.pantheon.getItemByIdent('AVANS').then((data) => {
        console.log('got the data', data);
      });
    });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
