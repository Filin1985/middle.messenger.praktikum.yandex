import Block from "../../core/Block";
import { Props } from "../../core/types";
import ModalAddUserTemplate from "./modalAddUser.hbs?raw";

export class ModalAddUser extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onAddNewUser: (event: Event | undefined) => {
        console.log(event);
        if (!event) return;
        event.preventDefault();
      },
    });
  }

  protected render(): string {
    return ModalAddUserTemplate;
  }
}
