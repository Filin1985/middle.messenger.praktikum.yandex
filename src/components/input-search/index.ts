import Block from "../../core/Block";
import { Props } from "../../core/types";
import SearchInputTemplate from "./inputSearch.hbs?raw";

export class InputSearch extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  public value() {
    return this._value();
  }

  public get name(): string {
    return (this.props?.name as string | undefined) || "";
  }

  protected render(): string {
    return SearchInputTemplate;
  }
}
