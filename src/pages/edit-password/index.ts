import { userData } from "../../data/user";
import Block from "../../core/Block";
import EditPasswordPageTemplate from "./editPassword.hbs?raw";

export class EditPasswordPage extends Block {
  constructor() {
    super({ events: {} });
    this.setProps({
      user: userData,
    });
  }

  protected render(): string {
    return EditPasswordPageTemplate;
  }
}
