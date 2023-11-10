import Block from "../../core/Block";
import { Props } from "../../core/types";
import { connect } from "../../utils/connect";
import MessageTemplate from "./message.hbs?raw";

class MessageComponent extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
    this.props.isOwner = this.isOwner.bind(this);
  }

  isOwner() {
    return this.props.message.user_id === this.props.user.id ? "owner" : "";
  }

  protected render(): string {
    return MessageTemplate;
  }
}

export const Message = connect(({ user }) => ({
  user,
}))(MessageComponent);
