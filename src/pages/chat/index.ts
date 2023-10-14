import Block from "../../core/Block";
import ChatTemplate from "./chat.hbs?raw";
import { chatData } from "../../data/chat";
import { InputSearch } from "../../components";

export class ChatPage extends Block {
  constructor() {
    super({
      onClick: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        const children = Object.values(this.refs);
        const dataInputs: Record<string, string | false> = {};
        children.forEach((child) => {
          if (child instanceof InputSearch) {
            dataInputs[child.name] = child.value();
          }
        });
        console.log(dataInputs);
      },
    });
    this.setProps({
      chats: [...chatData],
    });
  }

  protected render(): string {
    return ChatTemplate;
  }
}
