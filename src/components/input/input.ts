import { expect } from "chai";
import { Input } from ".";

const inputProps = {
  class: "user__input",
  id: "id",
  name: "input",
  type: "text",
  value: "Admin Admin",
  placeholder: "Enter your name",
  disabled: false,
};

describe("Test Input Component", () => {
  let inputElement: HTMLInputElement;
  beforeEach(() => {
    const input = new Input(inputProps);
    inputElement = input.getContent() as HTMLInputElement;
  });

  it("Input must be exists with mandatory attributes", () => {
    expect(inputElement).to.exist;
    expect(inputElement?.tagName.toLowerCase()).to.equal("input");
    expect(inputElement?.getAttribute("id")).to.equal("id");
    expect(inputElement?.getAttribute("name")).to.equal("input");
    expect(inputElement?.getAttribute("type")).to.equal("text");
    expect(inputElement?.getAttribute("placeholder")).to.equal(
      "Enter your name"
    );
  });

  it("Input value can be changed", () => {
    inputElement.setAttribute("value", "Admin Admin");
    expect(inputElement?.value).to.equal("Admin");
  });
});
