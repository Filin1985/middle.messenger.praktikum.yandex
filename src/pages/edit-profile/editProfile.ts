import { userData } from "../../data/user";
import Block from "../../core/Block";
import EditProfileTemplate from "./editProfile.hbs?raw";

export class EditProfile extends Block {
  constructor() {
    super({ events: {} });
    this.setProps({
      user: userData,
      isEdit: true,
    });
  }

  protected render(): string {
    return EditProfileTemplate;
  }
}
