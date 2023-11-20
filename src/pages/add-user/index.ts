import { createChat } from "../../controllers/chat";
import Block from "../../core/Block";
import Router from "../../core/Router";
import { Props } from "../../core/types";
import { connect } from "../../utils/connect";
import AddUserTemplate from "./addUser.hbs?raw";

class AddUser extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onSubmitUser: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        const chatTitle: HTMLInputElement | undefined =
          this.element?.querySelector("#newUser") as
            | HTMLInputElement
            | undefined;
        if (chatTitle && chatTitle.value) {
          createChat(chatTitle.value);
          Router.go("/messenger");
        }
      },
    });
    this.setProps({
      isEdit: true,
    });
  }

  protected render(): string {
    return AddUserTemplate;
  }
}

export const AddUserPage = connect(({ chats, selectedChat }) => ({
  chats,
  selectedChat,
}))(AddUser);
