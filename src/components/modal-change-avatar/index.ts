import { editAvatar } from "../../controllers/user";
import Block from "../../core/Block";
import { Props } from "../../core/types";
import ModalChangeAvatarTemplate from "./modalChangeAvatar.hbs?raw";

export class ModalChangeAvatar extends Block {
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
          this.onEditAvatar(loadAvatar.files[0]);
        }
      },
    });
  }

  onEditAvatar(file: File) {
    editAvatar(file);
    window.store.set({
      isChangeAvatarModalOpen: false,
    });
  }

  protected render(): string {
    return ModalChangeAvatarTemplate;
  }
}
