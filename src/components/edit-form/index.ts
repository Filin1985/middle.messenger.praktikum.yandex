import Block from "../../core/Block";
import { Props } from "../../core/types";
import EditFormTemplate from "./editForm.hbs?raw";

export class EditForm extends Block {
  constructor(props: Props) {
    super(props);
  }

  protected render(): string {
    return EditFormTemplate;
  }
}
