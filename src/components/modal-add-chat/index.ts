import { createChat } from "../../controllers/chat";
import Block from "../../core/Block";
import { Props } from "../../core/types";
import ModalAddChatTemplate from "./modalAddChat.hbs?raw";

export class ModalAddChat extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onAddNewChat: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        const chatTitle: HTMLInputElement | undefined =
          this.element?.querySelector("#newChat") as
            | HTMLInputElement
            | undefined;
        if (chatTitle && chatTitle.value) {
          createChat(chatTitle.value);
          window.store.set({ isAddNewChatModalOpen: false });
        }
      },
    });
  }

  protected render(): string {
    return ModalAddChatTemplate;
  }
}
