import { Test, TestingModule } from "@nestjs/testing";
import { UsingHelperServiceController } from "./using-helper-service.controller";
import { SpecificPantheonService } from "../specific-pantheon/specific-pantheon.service";

describe("UsingHelperService Controller", () => {
  let controller: UsingHelperServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsingHelperServiceController],
      providers: [{ provide: SpecificPantheonService, useValue: {} }]
    }).compile();

    controller = module.get<UsingHelperServiceController>(
      UsingHelperServiceController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
