import Block from "../../core/Block";
import { Props } from "../../core/types";
import ButtonTemplate from "./button.hbs?raw";

export class Button extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        // click: props. || (() => {}),
        ...(props.onSubmit ? { click: props.onSubmit } : {}),
        ...(props.onClick ? { click: props.onClose } : {}),
      },
    });
  }

  protected render(): string {
    return ButtonTemplate;
  }
}
