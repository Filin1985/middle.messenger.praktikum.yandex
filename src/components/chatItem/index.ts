import Block from "../../core/Block";
import { Props } from "../../core/types";
import ChatItemTemplate from "./chatItem.hbs?raw";

export class ChatItem extends Block {
  constructor(props: Props) {
    super(props);
  }

  protected render(): string {
    return ChatItemTemplate;
  }
}
