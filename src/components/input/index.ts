import Block from "../../core/Block";
import { Props } from "../../core/types";
import InputTemplate from "./input.hbs?raw";

export class Input extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        ...(props.onBlur ? { blur: props.onBlur } : {}),
        ...(props.onChange ? { change: props.onChange } : {}),
        ...(props.onInput ? { input: props.onInput } : {}),
        ...(props.onKeyDown ? { keydown: props.onKeyDown } : {}),
      },
    });
  }

  protected render(): string {
    return InputTemplate;
  }
}
