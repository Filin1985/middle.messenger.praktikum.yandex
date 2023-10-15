import Block from "../../core/Block";
import { Props } from "../../core/types";
import { userData } from "../../data/user";
import AvatarTemplate from "./avatar.hbs?raw";

export class Avatar extends Block {
  constructor(props: Props) {
    super(props);
    this.setProps({
      user: userData,
    });
  }

  protected render(): string {
    return AvatarTemplate;
  }
}
