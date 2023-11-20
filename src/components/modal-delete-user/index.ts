import Block from "../../core/Block";
import { Props } from "../../core/types";
import { connect } from "../../utils/connect";
import ModalDeleteUserTemplate from "./modalDeleteUser.hbs?raw";

export class ModalDeleteUserComponent extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  protected render(): string {
    return ModalDeleteUserTemplate;
  }
}

export const ModalDeleteUser = connect(({ user, selectedChatUsers }) => ({
  user,
  selectedChatUsers,
}))(ModalDeleteUserComponent);
