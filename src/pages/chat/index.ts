import Block from "../../core/Block";
import ChatTemplate from "./chat.hbs?raw";
import { InputSearch } from "../../components";
import { connect } from "../../utils/connect";

class Chat extends Block {
  constructor() {
    super({
      onClick: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        const dataInputs: Record<string, string | false> = {};
        Object.values(this.refs).forEach((child) => {
          if (child instanceof InputSearch) {
            dataInputs[child.name] = child.value();
          }
        });
        console.log(dataInputs);
      },
    });
  }

  protected render(): string {
    return ChatTemplate;
  }
}

export const ChatPage = connect(({ chats }) => ({ chats }))(Chat);
