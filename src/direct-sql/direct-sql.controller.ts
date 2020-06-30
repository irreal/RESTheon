import { Controller, Get, Query } from "@nestjs/common";
import { SqlService, Parameter } from "../sql/sql.service";

@Controller("direct-sql")
export class DirectSqlController {
  constructor(private sql: SqlService) {}

  @Get() // GET apiURL/direct-sql?acName=name
  async GetQueryResults(@Query("acName") acName: string) {
    const res = await this.sql.executeQuery(
      `select top 1 * from tHE_SetItem where acName = @acName`,
      [Parameter("acName", acName)]
    );
    return JSON.stringify(res);
  }

  @Get("procedure") // GET apiURL/direct-sql/procedure?anQty=1
  async GetStoredProcedureResults(@Query("anQty") anQty: number) {
    const res = await this.sql.executeProcedure(
      "_erp_pProcedureThatTakesanQty",
      [Parameter("anQty", anQty)]
    );
    return JSON.stringify(res);
  }
}
