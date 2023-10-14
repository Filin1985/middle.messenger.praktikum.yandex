import Block from "../../core/Block";
import ServerErrorTemplate from "./500.hbs?raw";

export class ServerError extends Block {
  constructor() {
    super({ events: {} });
  }

  protected render(): string {
    return ServerErrorTemplate;
  }
}
