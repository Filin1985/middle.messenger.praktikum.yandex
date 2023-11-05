import Block from "../../core/Block";
import EditProfileTemplate from "./editProfile.hbs?raw";
import { Props } from "../../core/types";
import { connect } from "../../utils/connect";

class EditProfile extends Block {
  constructor(props: Props) {
    super({
      ...props,
      isEdit: true,
    });
  }

  protected render(): string {
    return EditProfileTemplate;
  }
}

export const EditProfilePage = connect(({ user }) => ({ user }))(EditProfile);
