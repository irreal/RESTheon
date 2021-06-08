import { Injectable } from '@nestjs/common';
import { SqlService, Parameters } from '../sql/sql.service';

@Injectable()
export class SpecificPantheonService {
  constructor(private sql: SqlService) {}

  async getItemByClassif(acClassif: string, anSubClassif: number) {
    return await this.sql.executeQuery(
      'select * from tHE_SetItem where acClassif = @acClassif and anSubClassif = @anSubClassif',
      Parameters({ acClassif, anSubClassif }), //Parameters() takes a key value pair such as {"acKey" : "PRZ 01", "anQty" : 3}, this here is a shorthand to name them the same as, and take the values of, the getItemByClassif function parameters
    );
  }

  async getItemByIdent(acIdent: string) {
    return await this.sql.executeQuery(
      'select * from tHE_SetItem where acIdent = @acIdent',
      Parameters({ acIdent }), //Parameters() takes a key value pair such as {"acKey" : "PRZ 01", "anQty" : 3}, this here is a shorthand to name them the same as, and take the values of, the getItemByClassif function parameters
    );
  }

  async getStock() {
    return await this.sql.executeProcedure('_pNQ_StockGet', [] );
  }

  async postSubject(cActive : string, cShippingAddress : string, cEmail : string, cEmail2 : string, cFax : string, cSubject : string, cContact : string, cCurrency : string, cFieldSA : string, cFieldSAParentId : string, cCode : string, cAddress : string, cPhone : string, cPhone2 : string, cURL : string) {
    var nQID : number;
    return await this.sql.executeProcedure(
      '_pNQ_BuyerInsert @cActive, @cShippingAddress, @cEmail, @cEmail2, @cFax, @cSubject, @cContact, @cCurrency, @cFieldSA, @cFieldSAParentId, @cCode, @cAddress, @cPhone, @cPhone2, @cURL, @nQID output',
      Parameters({ cActive, cShippingAddress, cEmail, cEmail2, cFax, cSubject, cContact, cCurrency, cFieldSA, cFieldSAParentId, cCode, cAddress, cPhone, cPhone2, cURL, nQID }), //Parameters() takes a key value pair such as {"acKey" : "PRZ 01", "anQty" : 3}, this here is a shorthand to name them the same as, and take the values of, the getItemByClassif function parameters
    );
  }

  async putSubject(cActive : string, cShippingAddress : string, cEmail : string, cEmail2 : string, cFax : string, cSubject : string, cContact : string, cCurrency : string, cFieldSA : string, cFieldSAParentId : string, cCode : string, cAddress : string, cPhone : string, cPhone2 : string, cURL : string, nQID : number) {
    return await this.sql.executeProcedure(
      '_pNQ_BuyerUpdate @cActive, @cShippingAddress, @cEmail, @cEmail2, @cFax, @cSubject, @cContact, @cCurrency, @cFieldSA, @cFieldSAParentId, @cCode, @cAddress, @cPhone, @cPhone2, @cURL, @nQID',
      Parameters({ cActive, cShippingAddress, cEmail, cEmail2, cFax, cSubject, cContact, cCurrency, cFieldSA, cFieldSAParentId, cCode, cAddress, cPhone, cPhone2, cURL, nQID }), //Parameters() takes a key value pair such as {"acKey" : "PRZ 01", "anQty" : 3}, this here is a shorthand to name them the same as, and take the values of, the getItemByClassif function parameters
    );
  }  
}

export function GetStock(){
  var panth : SpecificPantheonService;
  return panth.getStock();

}