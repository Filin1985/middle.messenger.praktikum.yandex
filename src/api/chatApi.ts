import { API } from "./api";
import { ChatsResponse } from "./types";

export default class ChatApi extends API {
  constructor() {
    super("/chats");
  }

  async getChats(): Promise<ChatsResponse[]> {
    return this.http.get("/");
  }
}

export const chatApi = new ChatApi();
