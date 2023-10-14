import { userData } from "../../data/user";
import Block from "../../core/Block";
import ChangeAvatarTemplate from "./changeAvatar.hbs?raw";

export class ChangeAvatar extends Block {
  constructor() {
    super({ events: {} });
    this.setProps({
      user: userData,
      isEdit: true,
    });
  }

  protected render(): string {
    return ChangeAvatarTemplate;
  }
}
