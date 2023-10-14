import Block from "../../core/Block";
import { Props } from "../../core/types";
import MessageTemplate from "./message.hbs?raw";

export class Message extends Block {
  constructor(props: Props) {
    super(props);
  }

  protected render(): string {
    return MessageTemplate;
  }
}
