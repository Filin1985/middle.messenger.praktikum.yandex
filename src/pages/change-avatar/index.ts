import { editAvatar } from "../../controllers/user";
import Block from "../../core/Block";
import { Props } from "../../core/types";
import { connect } from "../../utils/connect";
import ChangeAvatarTemplate from "./changeAvatar.hbs?raw";

class ChangeAvatar extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onSubmitAvatar: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        const loadAvatar: HTMLInputElement | undefined =
          this.element?.querySelector("#avatar") as
            | HTMLInputElement
            | undefined;
        console.log(loadAvatar?.files);
        if (loadAvatar?.files) {
          this.onEditAvatar(loadAvatar.files[0]);
        }
      },
    });
    this.setProps({
      isEdit: true,
    });
  }

  onEditAvatar(file: File) {
    console.log(file);
    editAvatar(file);
  }

  protected render(): string {
    return ChangeAvatarTemplate;
  }
}

export const ChangeAvatarPage = connect(({ user }) => ({ user }))(ChangeAvatar);
