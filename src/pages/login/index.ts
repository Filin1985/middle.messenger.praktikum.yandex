import Block from "../../core/Block";
import LoginTemplate from "./login.hbs?raw";
import { Props } from "../../core/types";
import { InputAuth } from "../../components";

export class Login extends Block {
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
    return LoginTemplate;
  }
}
