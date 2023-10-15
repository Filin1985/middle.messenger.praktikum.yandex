import Block from "../../core/Block";
import { Props } from "../../core/types";
import InputTemplate from "./input.hbs?raw";

export class Input extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        blur: props.onBlur || (() => {}),
      },
    });
  }

  protected render(): string {
    return InputTemplate;
  }
}
