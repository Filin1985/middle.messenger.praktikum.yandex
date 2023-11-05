import Block from "../../core/Block";
import { Props } from "../../core/types";
import AvatarTemplate from "./avatar.hbs?raw";

export class Avatar extends Block {
  constructor(props: Props) {
    super(props);
    this.setProps({
      img: "person_3.png",
    });
  }

  protected render(): string {
    return AvatarTemplate;
  }
}
