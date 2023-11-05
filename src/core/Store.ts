/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError, ChatsResponse, UserData } from "../api/types";
import EventBus from "./EventBus";

export enum StoreEvents {
  Updated = "Updated",
}

export type State = {
  user: UserData | null | ApiError;
  chats: ChatsResponse[];
  messages: Record<number, Message[]>;
  searchedUsersChats: UserData[];
  selectedChat?: number;
};

const initialState = {
  user: null,
  chats: [],
  messages: {},
  searchedUsersChats: [],
  selectedChat: 0,
};

export class Store<State extends Record<string, any>> extends EventBus {
  private state: State = {} as State;

  constructor(defaultState: State) {
    super();
    this.state = defaultState;
    this.set(defaultState);
  }

  public getState() {
    return this.state;
  }

  public set(nextState: Partial<State>) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...nextState };
    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}

declare global {
  interface Window {
    store: Store<State>;
  }
}

const store = new Store<State>(initialState);
window.store = store;
