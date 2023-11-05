import Block from "../../core/Block";
import Router from "../../core/Router";
import { Props } from "../../core/types";
import SideLinkFormTemplate from "./sideLink.hbs?raw";

export class SideLink extends Block {
  constructor(props: Props) {
    super({
      ...props,
      toChats: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        Router.go("/messenger");
      },
    });
  }

  protected render(): string {
    return SideLinkFormTemplate;
  }
}
