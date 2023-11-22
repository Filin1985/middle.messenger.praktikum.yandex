import { expect } from "chai";

import Block from "./Block";
import { Props } from "./types";

class MockComponent extends Block {
  constructor(props: Props) {
    super({ ...props });
  }

  render(): string {
    return `<div>{{text}}</div>`;
  }
}

describe("Component", () => {
  const component = new MockComponent({ text: "Messenger" });
  const text = component.getContent()?.innerHTML;

  it("Must render new Component", () => {
    expect(text).to.equal("Messenger");
  });
});
