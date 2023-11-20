import { editChatAvatar } from "../../controllers/chat";
import Block from "../../core/Block";
import { Props } from "../../core/types";
import ModalChangeChatAvatarTemplate from "./modalChangeChatAvatar.hbs?raw";

export class ModalChangeChatAvatar extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onSubmitAvatar: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        const loadAvatar: HTMLInputElement | undefined =
          this.element?.querySelector("#avatar") as
            | HTMLInputElement
            | undefined;
        if (loadAvatar?.files) {
          console.log(loadAvatar.files[0]);
          this.onEditAvatar(loadAvatar.files[0]);
        }
      },
    });
  }

  onEditAvatar(file: File) {
    console.log(this.props.chatId);
    window.store.set({
      isChangeChatAvatarModalOpen: false,
    });
    editChatAvatar(file);
  }

  protected render(): string {
    console.log(this.props.chatId);
    return ModalChangeChatAvatarTemplate;
  }
}
