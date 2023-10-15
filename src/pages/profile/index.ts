import { userData } from "../../data/user";
import Block from "../../core/Block";
import ProfileTemplate from "./profile.hbs?raw";

export class ProfilePage extends Block {
  constructor() {
    super({ events: {} });
    this.setProps({
      user: userData,
      disabled: true,
    });
  }

  protected render(): string {
    return ProfileTemplate;
  }
}
