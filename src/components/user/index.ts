import { addUserToChat, deleteUserFromChat } from "../../controllers/chat";
import Block from "../../core/Block";
import { Props } from "../../core/types";
import UserTemplate from "./user.hbs?raw";

export class User extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onAddUserToChat: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        const user = this.props.user;
        if (user) {
          addUserToChat(user);
        }
      },
      onDeleteUser: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        const user = this.props.user;
        console.log(user);
        if (user) {
          deleteUserFromChat(user);
        }
      },
    });
    this.props.isAdmin = this.isAdmin.bind(this);
  }

  isAdmin() {
    return this.props.user.role === "admin" ? "admin" : "";
  }

  protected render(): string {
    return UserTemplate;
  }
}
