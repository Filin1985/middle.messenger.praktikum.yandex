import { userData } from "../../data/user";
import Block from "../../core/Block";
import EditProfileTemplate from "./editProfile.hbs?raw";
import { Props } from "../../core/types";

export class EditProfilePage extends Block {
  constructor(props: Props) {
    super({
      ...props,
      user: userData,
      isEdit: true,
    });
  }

  protected render(): string {
    return EditProfileTemplate;
  }
}
