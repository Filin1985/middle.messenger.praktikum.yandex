import Block from "../../core/Block";
import Router from "../../core/Router";
import { Props } from "../../core/types";
import NotFoundTemplate from "./404.hbs?raw";

export class NotFound extends Block {
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
    return NotFoundTemplate;
  }
}
