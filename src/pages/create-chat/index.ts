import { createChat } from "../../controllers/chat";
import Block from "../../core/Block";
import Router from "../../core/Router";
import { Props } from "../../core/types";
import { connect } from "../../utils/connect";
import CreateNewChartTemplate from "./createChat.hbs?raw";

class CreateNewChart extends Block {
  constructor(props: Props) {
    super({
      ...props,
      onSubmitTitle: (event: Event | undefined) => {
        if (!event) return;
        event.preventDefault();
        const chatTitle: HTMLInputElement | undefined =
          this.element?.querySelector("#title") as HTMLInputElement | undefined;
        if (chatTitle && chatTitle.value) {
          createChat(chatTitle.value);
          Router.go("/messenger");
        }
      },
    });
    this.setProps({
      isEdit: true,
    });
  }

  protected render(): string {
    return CreateNewChartTemplate;
  }
}

export const CreateNewChartPage = connect(({ user }) => ({ user }))(
  CreateNewChart
);
