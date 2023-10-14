import Block from "../../core/Block";
import { Props } from "../../core/types";
import { validator } from "../../utils/validation";
import InputAuthTemplate from "./inputAuth.hbs?raw";

interface AuthInputProps extends Props {
  onBlur: () => void;
  errorText: string;
  error: boolean;
}

export class InputAuth extends Block {
  constructor(props: AuthInputProps) {
    super({
      ...props,
      onBlur: () => this.validate(),
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
    if (errorText !== "") {
      console.log(errorText);
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

  protected render(): string {
    return InputAuthTemplate;
  }
}
