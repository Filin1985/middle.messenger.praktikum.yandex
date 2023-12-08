import { expect } from "chai";
import sinon from "sinon";

import Router from "./Router";
import Route from "./Route";
import Block, { BlockType } from "./Block";

class MockComponent extends Block {
  constructor(props: { text?: string }) {
    super({ ...props });
  }

  render(): string {
    return "<div>{{text}}</div>";
  }
}

describe("Tests for Router", () => {
  before(() => {
    Router.use("/", MockComponent as BlockType)
      .use("/component", MockComponent as BlockType)
      .use("/component1", MockComponent as BlockType)
      .use("/component2", MockComponent as BlockType);
  });

  beforeEach(() => {
    sinon.restore();
  });

  it("Must get Router by route", () => {
    const component = Router.getRoute("/component");
    expect(component).to.not.eq(undefined);
  });

  it("Must render page on start", () => {
    const component = Router.getRoute("/") as Route;
    const render = sinon.stub(component, "render");

    Router.start();

    expect(render.calledOnce).to.be.eq(true);
  });

  it("Must render page by using link", () => {
    const component = Router.getRoute("/component") as Route;
    const render = sinon.stub(component, "render");

    Router.go("/component");

    expect(render.calledOnce).to.be.eq(true);
  });

  it("Must render page when it goes back", async () => {
    const clock = sinon.useFakeTimers();
    const component = Router.getRoute("/") as Route;
    const render = sinon.stub(component, "render");

    Router.back();
    await clock.tickAsync(1);

    expect(render.calledOnce).to.be.eq(true);
  });

  it("Must render page when it goes forward", async () => {
    const clock = sinon.useFakeTimers();
    const component = Router.getRoute("/component") as Route;
    const render = sinon.stub(component, "render");

    Router.forward();
    await clock.tickAsync(1);

    expect(render.calledOnce).to.be.eq(true);
  });
});
