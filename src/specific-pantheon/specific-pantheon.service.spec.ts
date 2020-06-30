import { Test, TestingModule } from "@nestjs/testing";
import { SpecificPantheonService } from "./specific-pantheon.service";
import { SqlService } from "../sql/sql.service";

describe("SpecificPantheonService", () => {
  let service: SpecificPantheonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpecificPantheonService,
        { provide: SqlService, useValue: {} }
      ]
    }).compile();

    service = module.get<SpecificPantheonService>(SpecificPantheonService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
