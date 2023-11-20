import Block from "../../core/Block";
import EditPasswordPageTemplate from "./editPassword.hbs?raw";
import { connect } from "../../utils/connect";
import { Props } from "../../core/types";

class EditPassword extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected render(): string {
    return EditPasswordPageTemplate;
  }
}

export const EditPasswordPage = connect(({ user }) => ({ user }))(EditPassword);
