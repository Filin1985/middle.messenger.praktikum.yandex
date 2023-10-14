import { InputMessage } from "..";
import Block from "../../core/Block";
import { messageData } from "../../data/message";
import MessagesTemplate from "./messages.hbs?raw";

export class Messages extends Block {
  constructor() {
    super({
      onClick: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        const children = Object.values(this.refs);
        const dataInputs: Record<string, string | false> = {};
        children.forEach((child) => {
          if (child instanceof InputMessage) {
            dataInputs[child.name] = child.value();
          }
        });
        console.log(dataInputs);
      },
    });
    this.setProps({
      messages: [...messageData],
    });
  }

  protected render(): string {
    return MessagesTemplate;
  }
}
