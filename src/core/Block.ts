import { v4 as uuidv4 } from "uuid";
import EventBus from "./EventBus";
import Handlebars from "handlebars";
import { Props, Children } from "./types";

export type BlockType = {
  new (childrenAndProps: Props): Block;
};

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
    FLOW_CWU: "flow:component-will-unmount",
  };

  public id = uuidv4();
  protected props: Props;
  private _element: HTMLElement | null = null;
  protected readonly eventBus: () => EventBus;
  private children: Children = {};
  protected refs: Record<string, Block> = {};

  constructor(propsWithChildren: Props) {
    const eventBus = new EventBus();

    const { props, children } = this.getChildrenAndProps(propsWithChildren);
    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private getChildrenAndProps(childrenAndProps: Props) {
    const props: Props = {};
    const children: Children = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
  }

  private _init() {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {
    return this;
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    Object.values(this.children).forEach((child) =>
      child.dispatchComponentDidMount()
    );
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props) {
    return oldProps !== newProps;
  }

  private _componentWillUnmount() {
    this.componentWillUnmount();
    this._removeEvents();
  }

  protected componentWillUnmount() {
    this._removeEvents();
  }

  _removeEvents() {
    const { events = {} } = this.props as {
      events: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  public setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.compile(this.render(), this.props);

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  private compile(template: string, context: object) {
    const contextAndStubs = {
      ...context,
      __children: [] as Array<{
        component: unknown;
        embed(node: DocumentFragment): void;
      }>,
      __refs: this.refs,
    };

    const html = Handlebars.compile(template)(contextAndStubs);

    const temp = document.createElement("template");

    temp.innerHTML = html;

    contextAndStubs.__children?.forEach(({ embed }) => {
      embed(temp.content);
    });

    return temp.content;
  }

  protected render(): string {
    return "";
  }

  _addEvents() {
    const { events = {} } = this.props as {
      events: Record<string, () => void>;
    };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  getContent() {
    return this.element;
  }

  protected _value() {
    const input = this.refs?.input;
    if (input instanceof Block) {
      const { element } = input;
      if (element instanceof HTMLInputElement) {
        return element.value;
      }
    }
    return "";
  }

  _makePropsProxy(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };

        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }
}
