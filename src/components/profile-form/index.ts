import Block from "../../core/Block";
import { Props } from "../../core/types";
import ProfileFormTemplate from "./profileForm.hbs?raw";

export class ProfileForm extends Block {
  constructor(props: Props) {
    super(props);
  }

  protected render(): string {
    return ProfileFormTemplate;
  }
}
