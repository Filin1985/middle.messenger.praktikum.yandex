import Block from "../../core/Block";
import { Props } from "../../core/types";
import { InputAuth } from "../../components";
import SignupTemplate from "./signup.hbs?raw";
import Router from "../../core/Router";
import { signup } from "../../controllers/auth";

export class Signup extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onSignup: (event: Event | undefined) => {
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
          signup({
            first_name: dataInputs.first_name as string,
            second_name: dataInputs.second_name as string,
            login: dataInputs.login as string,
            email: dataInputs.email as string,
            password: dataInputs.password as string,
            phone: dataInputs.phone as string,
          });
        }
        console.log(dataInputs);
      },
      toLogin: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        Router.go("/login");
      },
    });
  }

  protected render(): string {
    return SignupTemplate;
  }
}
