import Block from "./Block";

export type HttpProps = {
  get: (arg0: string, arg1: Options) => void;
  post: (arg0: string, arg1: Options) => void;
  put: (arg0: string, arg1: Options) => void;
  delete: (arg0: string, arg1: Options) => void;
  request: (arg0: string, arg1: Options) => void;
};

export type Options = {
  headers?: [string, string];
  method: string;
  data?: [string, string][];
  timeout?: number;
  retries?: number;
};

export type Props = Record<string | symbol, unknown>;
export type Children = Record<string, Block>;
