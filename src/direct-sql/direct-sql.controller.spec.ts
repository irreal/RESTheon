import { Test, TestingModule } from "@nestjs/testing";
import { DirectSqlController } from "./direct-sql.controller";
import { SqlService } from "../sql/sql.service";

describe("DirectSql Controller", () => {
  let controller: DirectSqlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectSqlController],
      providers: [{ provide: SqlService, useValue: {} }]
    }).compile();

    controller = module.get<DirectSqlController>(DirectSqlController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
