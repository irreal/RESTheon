import { ISqlType } from "mssql";

export type Parameter = {
  name: string;
  type?: ISqlType;
  value: any;
};
