import { InputAuth } from "..";
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
    return ProfileFormTemplate;
  }
}
