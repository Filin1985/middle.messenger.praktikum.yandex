import Block from "../../core/Block";
import { Props } from "../../core/types";
import UsersTemplate from "./users.hbs?raw";

export class Users extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected render(): string {
    return UsersTemplate;
  }
}
