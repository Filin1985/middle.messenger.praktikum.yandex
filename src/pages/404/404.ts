import Block from "../../core/Block";
import NotFoundTemplate from "./404.hbs?raw";

export class NotFound extends Block {
  constructor() {
    super({ events: {} });
  }

  protected render(): string {
    return NotFoundTemplate;
  }
}
