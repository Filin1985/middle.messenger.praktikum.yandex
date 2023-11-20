import Block from "../../core/Block";
import ProfileTemplate from "./profile.hbs?raw";
import { connect } from "../../utils/connect";
import { Props } from "../../core/types";

class Profile extends Block {
  constructor(props: Props) {
    super({ events: {}, ...props });
  }

  protected render(): string {
    return ProfileTemplate;
  }
}

export const ProfilePage = connect(({ user }) => ({ user }))(Profile);
