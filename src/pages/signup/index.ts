import Block from "../../core/Block";
import { Props } from "../../core/types";
import { InputAuth } from "../../components";
import SignupTemplate from "./signup.hbs?raw";

export class Signup extends Block {
  protected constructor(props: Props) {
    super({
      ...props,
      onLogin: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        const dataInputs: Record<string, string | false> = {};
        Object.values(this.refs).forEach((child) => {
          if (child instanceof InputAuth) {
            dataInputs[child.name] = child.value();
          }
        });
        console.log(dataInputs);
      },
    });
  }

  protected render(): string {
    return SignupTemplate;
  }
}
