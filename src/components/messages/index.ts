import { InputMessage } from "..";
import Block from "../../core/Block";
import { Props } from "../../core/types";
import MessagesTemplate from "./messages.hbs?raw";

export class Messages extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onClick: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        const dataInputs: Record<string, string | false> = {};
        Object.values(this.refs).forEach((child) => {
          if (child instanceof InputMessage) {
            dataInputs[child.name] = child.value();
          }
        });
        console.log(dataInputs);
      },
    });
  }

  protected render(): string {
    console.log(this.props);
    return MessagesTemplate;
  }
}
