import { ISqlType } from 'mssql';

export type OutputParameter = {
  name: string;
  type?: ISqlType;
};
export type Parameter = OutputParameter & {
  value: any;
};
