import { Controller, Get, Query } from "@nestjs/common";
import { SpecificPantheonService } from "../specific-pantheon/specific-pantheon.service";

@Controller("using-helper-service")
export class UsingHelperServiceController {
  constructor(private pantheon: SpecificPantheonService) {}

  @Get("") // apiurl/using-helper-service?ident=00001
  async getByIdent(@Query("ident") ident: string) {
    return await this.pantheon.getItemByIdent(ident);
  }

  @Get("by-classification") // apiurl/using-helper-service/by-classification?classif=asd&sub-classif=1
  async getByClassif(
    @Query("classif") classif: string,
    @Query("sub-classif") subClassif: number
  ) {
    return await this.pantheon.getItemByClassif(classif, subClassif);
  }
}
