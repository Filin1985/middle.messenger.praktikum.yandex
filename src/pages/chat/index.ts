import Block from "../../core/Block";
import ChatTemplate from "./chat.hbs?raw";
import { InputSearch } from "../../components";
import { connect } from "../../utils/connect";
import { Props } from "../../core/types";
import { setChat } from "../../controllers/chat";

class Chat extends Block {
  constructor(props: Props) {
    super({
      ...props,
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
      onAddNewChat: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        window.store.set({ isAddNewChatModalOpen: true });
      },
      onSetSelected: (id: number) => {
        setChat(id);
      },
    });
  }

  protected render(): string {
    return ChatTemplate;
  }
}

export const ChatPage = connect(
  ({ chats, selectedChat, isAddUserModalOpen, isAddNewChatModalOpen }) => ({
    chats,
    selectedChat,
    isAddUserModalOpen,
    isAddNewChatModalOpen,
  })
)(Chat);
