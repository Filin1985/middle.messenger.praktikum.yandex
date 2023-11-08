import { addUserToChat } from "../../controllers/chat";
import Block from "../../core/Block";
import { Props } from "../../core/types";
import UserTemplate from "./user.hbs?raw";

export class User extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onAddUserToChat: (event: Event | undefined) => {
        console.log(event);
        if (!event) return;
        event.preventDefault();
        const user = this.props.user;
        console.log(user);
        if (user) {
          addUserToChat(user);
        }
      },
    });
  }

  protected render(): string {
    return UserTemplate;
  }
}
