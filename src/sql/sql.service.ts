import { Injectable } from "@nestjs/common";
import { ConnectionPool, Request } from "mssql";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SqlService {
  pool1: ConnectionPool;
  pool1Connect: Promise<void>;
  failCount = 0;

  constructor(config: ConfigService) {
    const dbConfig = {
      user: config.get("DB_USERNAME"),
      password: config.get("DB_PASSWORD"),
      server: config.get("DB_SERVER"),
      database: config.get("DB_DATABASE"),
    };
    console.log("Connecting to SQL with: ", { ...dbConfig, password: "****" });
    const connPoolOptions = {
      ...dbConfig,
      options: { encrypt: false, enableArithAbort: true },
    };
    this.pool1 = new ConnectionPool(connPoolOptions);
  }

  delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  async connectToSql() {
    return new Promise(async (resolve, reject) => {
      for (let i = 0; i < 5; i++) {
        try {
          console.log("trying to connect");
          await this.pool1.connect();
          console.log("Connected to sql server!");
          resolve();
          return;
        } catch (err) {
          console.log("Failed to connect to sql server.", err);
        }
        this.pool1.close();
        if (i < 4) {
          console.log("Retrying in 5 seconds");
          await this.delay(5000);
        }
      }
      reject(
        "Could not connect to the sql server in 5 tries, check env configuration"
      );
    });
  }

  async executeProcedure(procedureName, inputParameters) {
    try {
      await this.pool1Connect;

      var request = new Request(this.pool1);
      this.mapInputParameters(request, inputParameters);

      var result = await request.execute(procedureName);
      return result.recordset;
    } catch (err) {
      console.log(
        `Error in sql service executing procedure ${procedureName}`,
        inputParameters,
        err
      );
      throw err;
    }
  }

  async executeQuery(query, inputParameters) {
    try {
      await this.pool1Connect;

      var request = new Request(this.pool1);
      this.mapInputParameters(request, inputParameters);

      var result = await request.query(query);
      return result;
    } catch (err) {
      console.log(
        `Error in sql service executing query ${query}`,
        inputParameters,
        err
      );
      throw err;
    }
  }

  parameter(name, type, value) {
    return { name, type, value };
  }

  mapInputParameters(request, inputParameters) {
    if (!inputParameters) {
      return;
    }
    inputParameters.forEach((p) => {
      request.input(p.name, p.type, p.value);
    });
  }
}
