import { searchUsers } from "../../controllers/user";
import Block from "../../core/Block";
import { Props } from "../../core/types";
import { connect } from "../../utils/connect";
import ModalAddUserTemplate from "./modalAddUser.hbs?raw";

export class ModalAddUserComponent extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onAddNewUser: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        const searchValue: HTMLInputElement | undefined =
          this.element?.querySelector("#search") as
            | HTMLInputElement
            | undefined;
        console.log(searchValue);
        if (searchValue && searchValue.value) {
          searchUsers({ login: searchValue.value });
        }
      },
    });
  }

  protected render(): string {
    return ModalAddUserTemplate;
  }
}

export const ModalAddUser = connect(({ searchedUsersChats }) => ({
  searchedUsersChats,
}))(ModalAddUserComponent);
