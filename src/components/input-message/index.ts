import { Input } from "..";
import Block from "../../core/Block";
import { Props } from "../../core/types";
import { validator } from "../../utils/validation";
import MessageInputTemplate from "./inputMessage.hbs?raw";

export class InputMessage extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  public value() {
    if (!this.validate()) {
      return false;
    }

    return this._value();
  }

  public get name(): string {
    return (this.props?.name as string | undefined) || "";
  }

  private validate() {
    const value = this._value();
    const errorText =
      validator[this.props.validateType as keyof typeof validator](value);
    if (errorText) {
      const errorBlock = this.refs.error || null;
      if (errorBlock instanceof Block) {
        errorBlock.setProps({ error: errorText });
        return false;
      }
    }
    const errorBlock = this.refs.error || null;
    if (errorBlock instanceof Block) {
      errorBlock.setProps({ error: undefined });
    }
    return true;
  }

  public setValue(value: string) {
    const input = (this.refs?.input as Input) || undefined;
    if (input) {
      const inputHtml = (input?.element as HTMLInputElement) || undefined;
      if (inputHtml) {
        inputHtml.value = value;
      }
    }
  }

  protected render(): string {
    return MessageInputTemplate;
  }
}
