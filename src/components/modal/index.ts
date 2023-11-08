import Block from "../../core/Block";
import { Props } from "../../core/types";
import { connect } from "../../utils/connect";
import ModalTemplate from "./modal.hbs?raw";

export class ModalComponent extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onCloseModal: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        window.store.set({
          isAddUserModalOpen: false,
          isChangeAvatarModalOpen: false,
          isAddNewChatModalOpen: false,
          searchedUsersChats: [],
        });
      },
    });
  }

  protected render(): string {
    return ModalTemplate;
  }
}

export const Modal = connect(({ searchedUsersChats }) => ({
  searchedUsersChats,
}))(ModalComponent);
