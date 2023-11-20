import Block from "../../core/Block";
import LoginTemplate from "./login.hbs?raw";
import { Props } from "../../core/types";
import { InputAuth } from "../../components";
import Router from "../../core/Router";
import { login } from "../../controllers/auth";

export class Login extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onLogin: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        const dataInputs: Record<string, string | false> = {};
        let inputError = false;
        Object.values(this.refs).forEach((child) => {
          if (child instanceof InputAuth) {
            dataInputs[child.name] = child.value();
            if (child.value() === false) {
              inputError = true;
            }
          }
        });
        if (!inputError) {
          login({
            login: dataInputs.login as string,
            password: dataInputs.password as string,
          });
        }
        console.log(dataInputs);
      },

      toSignup: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        Router.go("/signup");
      },
    });
  }

  protected render(): string {
    return LoginTemplate;
  }
}
