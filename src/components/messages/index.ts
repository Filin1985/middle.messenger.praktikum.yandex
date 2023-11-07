import { InputMessage } from "..";
import { addUserToChat } from "../../controllers/chat";
import Block from "../../core/Block";
import Router from "../../core/Router";
import { Props } from "../../core/types";
import { connect } from "../../utils/connect";
import MessagesTemplate from "./messages.hbs?raw";

export class MessagesComponent extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onClick: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        const dataInputs: Record<string, string | false> = {};
        Object.values(this.refs).forEach((child) => {
          if (child instanceof InputMessage) {
            dataInputs[child.name] = child.value();
          }
        });
        console.log(dataInputs);
      },
      onAddUser: () => {
        window.store.set({ isAddUserModalOpen: true });
      },
    });
    this.setProps({
      usersLength: this.props.selectedChatUsers.length > 1,
    });
  }

  protected render(): string {
    return MessagesTemplate;
  }
}

export const Messages = connect(
  ({ selectedChatMessages, selectedChat, selectedChatUsers }) => ({
    selectedChatMessages,
    selectedChat,
    selectedChatUsers,
  })
)(MessagesComponent);
