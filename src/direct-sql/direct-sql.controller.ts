import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { SqlService, Parameter } from "../sql/sql.service";
import { AuthGuard } from "@nestjs/passport";
import { ApiBasicAuth } from "@nestjs/swagger";

@UseGuards(AuthGuard("basic")) // this example applies the guard (requires user authentication) for this entire controller
@ApiBasicAuth()
@Controller("direct-sql")
export class DirectSqlController {
  constructor(private sql: SqlService) {}

  @Get() // GET apiURL/direct-sql?name=some-name
  async GetQueryResults(@Query("name") name: string) {
    const res = await this.sql.executeQuery(
      `select top 1 * from tHE_SetItem where acName = @acName`,
      [Parameter("acName", name)]
    );
    return JSON.stringify(res);
  }

  @Get("procedure") // GET apiURL/direct-sql/procedure?quantity=1
  async GetStoredProcedureResults(@Query("quantity") quantity: number) {
    const res = await this.sql.executeProcedure(
      "_erp_pProcedureThatTakesanQty",
      [Parameter("anQty", quantity)] // Parameter takes a name and a value, and turns it into a parameter for the query or function
    );
    return JSON.stringify(res);
  }
}
