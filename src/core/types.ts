import Block from "./Block";

export type HttpProps = {
  get: (arg0: string, arg1: Options) => void;
  post: (arg0: string, arg1: Options) => void;
  put: (arg0: string, arg1: Options) => void;
  delete: (arg0: string, arg1: Options) => void;
  request: (arg0: string, arg1: Options) => void;
};

export enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type Options = {
  method: METHODS;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string | symbol, any> | FormData;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
};
export type OptionsOmitMethod = Omit<Options, "method">;
type Events = {
  [key: string | symbol]: (e: Event) => void;
};
export type Props = {
  events?: Events;
  parent?: Block | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string | symbol]: any;
};
export type Children = Record<string, Block>;

export type WebSocketData = {
  userId: number;
  chatId: number;
  token: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callbackMessages: (data: any) => void;
};

export type Message = {
  content: unknown;
  type: string;
};

export enum STATE {
  OPEN,
  CONNECTING,
  CLOSING,
  CLOSED,
}
