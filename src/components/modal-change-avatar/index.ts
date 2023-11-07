import Block from "../../core/Block";
import { Props } from "../../core/types";
import ModalChangeAvatarTemplate from "./modalChangeAvatar.hbs?raw";

export class ModalChangeAvatar extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onChangeAvatar: (event: Event | undefined) => {
        console.log(event);
        if (!event) return;
        event.preventDefault();
      },
    });
  }

  protected render(): string {
    return ModalChangeAvatarTemplate;
  }
}
