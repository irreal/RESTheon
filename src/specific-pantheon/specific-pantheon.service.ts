import { Injectable } from "@nestjs/common";
import { SqlService, Parameters } from "../sql/sql.service";

@Injectable()
export class SpecificPantheonService {
  constructor(private sql: SqlService) {}

  async getItemByClassif(acClassif: string, anSubClassif: number) {
    return await this.sql.executeQuery(
      "select * from tHE_SetItem where acClassif = @acClassif and anSubClassif = @anSubClassif",
      Parameters({ acClassif, anSubClassif }) //Parameters() takes a key value pair such as {"acKey" : "PRZ 01", "anQty" : 3}, this here is a shorthand to name them the same as, and take the values of, the getItemByClassif function parameters
    );
  }

  async getItemByIdent(acIdent: string) {
    return await this.sql.executeQuery(
      "select * from tHE_SetItem where acIdent = @acIdent",
      Parameters({ acIdent }) //Parameters() takes a key value pair such as {"acKey" : "PRZ 01", "anQty" : 3}, this here is a shorthand to name them the same as, and take the values of, the getItemByClassif function parameters
    );
  }
}
