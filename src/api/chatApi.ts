import { API } from "./api";
import {
  ApiError,
  ChatsResponse,
  DeletedChat,
  UserChatData,
  AddDeleteUsersToChatData,
} from "./types";

export default class ChatApi extends API {
  constructor() {
    super("/chats");
  }

  async getChats(): Promise<ChatsResponse[]> {
    return this.http.get("/");
  }

  async createChat(data: { title: string }): Promise<void | ApiError> {
    return this.http.post<void>("/", { data });
  }

  async deleteChat(data: { chatId: number }): Promise<DeletedChat | ApiError> {
    return this.http.delete<DeletedChat>("/", { data });
  }

  async getChatUsers(id: number): Promise<UserChatData[] | ApiError> {
    return this.http.get<UserChatData[]>(`/${id}/users`);
  }

  async addUsersToChat(
    data: AddDeleteUsersToChatData
  ): Promise<void | ApiError> {
    return this.http.put<void>("/users", { data });
  }

  async deleteUsersFromChat(
    data: AddDeleteUsersToChatData
  ): Promise<void | ApiError> {
    return this.http.delete<void>("/users", { data });
  }

  async getUserToken(chatId: number): Promise<{ token: string } | ApiError> {
    return this.http.post<{ token: string }>(`/token/${chatId}`);
  }
}

export const chatApi = new ChatApi();
