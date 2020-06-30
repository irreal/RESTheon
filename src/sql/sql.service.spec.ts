import { Test, TestingModule } from "@nestjs/testing";
import { SqlService } from "./sql.service";
import { ConfigModule } from "@nestjs/config";
jest.mock("mssql");

describe("SqlService", () => {
  let service: SqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SqlService],
      imports: [
        ConfigModule.forRoot({
          envFilePath: ".unit-test.env",
          isGlobal: true
        })
      ]
    }).compile();

    service = module.get<SqlService>(SqlService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
