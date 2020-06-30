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
    this.pool1 = new ConnectionPool({
      ...dbConfig,
      options: { encrypt: false, enableArithAbort: true },
    });

    this.connectToSql();
  }

  connectToSql() {
    this.pool1Connect = (this.pool1.connect((err) => {
      if (!err) {
        console.log("Connected to sql server!");
        return;
      }
      this.pool1.close();
      this.retryConnection(err);
    }) as any) as Promise<void>;
  }

  retryConnection(err) {
    console.log("Failed to connect to sql server.", err);
    this.failCount++;
    if (this.failCount > 5) {
      console.log("Could not connect to sql 5 times, aborting app");
      throw new Error("Could not connect to sql server");
    }
    console.log("Retrying in 5 seconds");
    setTimeout(() => {
      this.connectToSql();
    }, 5000);
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
