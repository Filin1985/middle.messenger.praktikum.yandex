import { InputAuth } from "..";
import { editPasswordData } from "../../controllers/user";
import Block from "../../core/Block";
import { Props } from "../../core/types";
import EditPasswordTemplate from "./editPassword.hbs?raw";

export class EditPassword extends Block {
  protected constructor(props: Props) {
    super({
      ...props,
      onClick: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        const dataInputs: Record<string, string | false> = {};
        let error = false;
        Object.values(this.refs).forEach((child) => {
          if (child instanceof InputAuth) {
            dataInputs[child.name] = child.value();
            if (child.value() === false) {
              error = true;
            }
          }
        });
        if (!error) {
          editPasswordData({
            oldPassword: dataInputs.old_password as string,
            newPassword: dataInputs.new_password as string,
          });
        }
        console.log(dataInputs);
      },
    });
  }

  protected render(): string {
    return EditPasswordTemplate;
  }
}
