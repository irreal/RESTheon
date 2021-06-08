import { Injectable } from '@nestjs/common';
import { Parameters, SqlService } from 'src/sql/sql.service';

@Injectable()
export class StockService {
  constructor(private sql: SqlService) {}
  async getStock() {
    return await this.sql.executeProcedure('_pNQ_StockGet', []);
  }
}
