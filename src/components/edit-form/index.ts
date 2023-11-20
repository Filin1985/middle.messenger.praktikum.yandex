import { logout } from "../../controllers/auth";
import Block from "../../core/Block";
import Router from "../../core/Router";
import { Props } from "../../core/types";
import EditFormTemplate from "./editForm.hbs?raw";

export class EditForm extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onSignOut: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        logout();
        Router.go("/login");
      },
      toEditProfile: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        Router.go("/edit-profile");
      },
      toChangePassword: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        Router.go("/edit-password");
      },
    });
  }

  protected render(): string {
    return EditFormTemplate;
  }
}
