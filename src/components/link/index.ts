import Block from "../../core/Block";
import { Props } from "../../core/types";
import LinkTemplate from "./link.hbs?raw";

export class Link extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick || (() => {}),
      },
    });
  }

  protected render(): string {
    return LinkTemplate;
  }
}
