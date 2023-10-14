import Block from "../../core/Block";
import ErrorTemplate from "./error.hbs?raw";

export class Error extends Block {
  protected render(): string {
    return ErrorTemplate;
  }
}
