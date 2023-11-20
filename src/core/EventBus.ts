export default class EventBus {
  private readonly listeners: {
    [event: string]: Array<(...args: object[]) => void>;
  } = {};

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: (...args: NonNullable<unknown>[]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: (...args: NonNullable<unknown>[]) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, ...args: NonNullable<unknown>[]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
