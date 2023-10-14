import { userData } from "../../data/user";
import Block from "../../core/Block";
import ProfileTemplate from "./profile.hbs?raw";

export class Profile extends Block {
  constructor() {
    super({ events: {} });
    this.setProps({
      user: userData,
    });
  }

  protected render(): string {
    return ProfileTemplate;
  }
}
