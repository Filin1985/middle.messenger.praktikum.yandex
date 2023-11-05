import { InputAuth } from "..";
import { editProfileData } from "../../controllers/user";
import Block from "../../core/Block";
import { Props } from "../../core/types";
import ProfileFormTemplate from "./profileForm.hbs?raw";

export class ProfileForm extends Block {
  constructor(props: Props) {
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
          editProfileData({
            login: dataInputs.login as string,
            first_name: dataInputs.first_name as string,
            second_name: dataInputs.second_name as string,
            display_name: dataInputs.display_name as string,
            phone: dataInputs.phone as string,
            email: dataInputs.email as string,
          });
        }
        console.log(dataInputs);
      },
    });
  }

  protected render(): string {
    return ProfileFormTemplate;
  }
}
