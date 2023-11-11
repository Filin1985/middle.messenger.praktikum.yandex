import Block from "../../core/Block";
import { Props } from "../../core/types";
import { connect } from "../../utils/connect";
import ChatItemTemplate from "./chatItem.hbs?raw";

export class ChatItemComponents extends Block {
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

export const ChatItem = connect(({ user }) => ({
  user,
}))(ChatItemComponents);
