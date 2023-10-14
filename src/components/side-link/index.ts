import Block from "../../core/Block";
import { Props } from "../../core/types";
import SideLinkFormTemplate from "./sideLink.hbs?raw";

export class SideLink extends Block {
  constructor(props: Props) {
    super(props);
  }

  protected render(): string {
    return SideLinkFormTemplate;
  }
}
