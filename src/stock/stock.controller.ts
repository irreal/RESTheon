import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private stock: StockService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async Stock() {
    const sqlResult = await this.stock.getStock();
    console.log(sqlResult);
    return {
      message: {
        queryResult: {
          rowCount: sqlResult.length,
          rows: sqlResult,
          outParams: {},
        },
      },
    };
  }
}
