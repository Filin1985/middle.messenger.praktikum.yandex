import Block from "../../core/Block";
import { Props } from "../../core/types";
import AvatarTemplate from "./avatar.hbs?raw";

export class Avatar extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onOpenChangeModal: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        window.store.set({
          isChangeAvatarModalOpen: true,
        });
      },
    });
  }

  protected render(): string {
    return AvatarTemplate;
  }
}
