import Block from "../../core/Block";
import { Props } from "../../core/types";
import ModalTemplate from "./modal.hbs?raw";

export class Modal extends Block {
  constructor(props: Props) {
    super(props);
  }

  protected render(): string {
    return ModalTemplate;
  }
}
