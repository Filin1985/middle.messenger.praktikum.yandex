import Block from "./Block";

export type Http = {
  get: Function;
  post: Function;
  put: Function;
  delete: Function;
  request: Function;
};

export type Options = {
  method: string;
  headers?: [string, string];
  data?: [string, string][];
  timeout?: number;
  retries?: number;
};

export type Props = Record<string | symbol, unknown>;
export type Children = Record<string, Block>;
