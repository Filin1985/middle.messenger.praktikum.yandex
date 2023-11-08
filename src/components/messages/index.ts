import { InputMessage } from "..";
import { sendMessage } from "../../controllers/chat";
import Block from "../../core/Block";
import { Props } from "../../core/types";
import { connect } from "../../utils/connect";
import MessagesTemplate from "./messages.hbs?raw";

export class MessagesComponent extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onSend: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        const dataInputs: Record<string, string | false> = {};
        Object.values(this.refs).forEach((child) => {
          if (child instanceof InputMessage) {
            dataInputs[child.name] = child.value();
            this.send(dataInputs.message as string);
          }
        });
        console.log(dataInputs);
      },
      onAddUser: () => {
        window.store.set({ isAddUserModalOpen: true });
      },
      onKeyDown: (event: KeyboardEvent) => {
        if (event?.key === "Enter") {
          event.preventDefault();
          // this.send();
        }
      },
    });
    this.setProps({
      usersLength: this.props.selectedChatUsers.length > 1,
    });
  }

  protected send(value: string) {
    if (value) {
      sendMessage(value);
    }
  }

  protected render(): string {
    console.log(this.props);
    return MessagesTemplate;
  }
}

export const Messages = connect(
  ({
    selectedChatMessages,
    selectedChat,
    selectedChatUsers,
    messagesLength,
  }) => ({
    selectedChatMessages,
    selectedChat,
    selectedChatUsers,
    messagesLength,
  })
)(MessagesComponent);
