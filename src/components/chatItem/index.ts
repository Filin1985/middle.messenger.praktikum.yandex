import Block from "../../core/Block";
import { Props } from "../../core/types";
import ChatItemTemplate from "./chatItem.hbs?raw";

export class ChatItem extends Block {
  constructor(props: Props) {
    super({
      ...props,
      select: () => props?.id === props?.selectedChat,
      events: {
        click: (event) => {
          if (!event) return;
          event.preventDefault();
          if (props.onSetSelected) {
            props.onSetSelected.call(this, this.props?.id);
          }
        },
      },
    });
  }

  protected render(): string {
    return ChatItemTemplate;
  }
}
