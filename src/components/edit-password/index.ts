import Block from "../../core/Block";
import { Props } from "../../core/types";
import EditPasswordTemplate from "./editPassword.hbs?raw";

export class EditPassword extends Block {
  constructor(props: Props) {
    super(props);
  }

  protected render(): string {
    return EditPasswordTemplate;
  }
}
