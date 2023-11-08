import { MessageData, UserData } from "../api/types";
import Socket from "../core/WSocket";
import { getUserToken } from "./chat";
import { Message, WebSocketData } from "../core/types";
import { arrangeLastMessage } from "./utils";

class WSService {
  static _instance: WSService | undefined;

  protected socket: Socket | null = null;

  protected socketData: WebSocketData = {
    userId: 0,
    chatId: 0,
    token: "",
    callbackMessages: (data: MessageData | MessageData[]) => {
      this.pushMessage(data);
    },
  };

  constructor() {
    if (WSService._instance) {
      return WSService._instance;
    }

    WSService._instance = this;
  }

  async connect() {
    const { user, selectedChat } = window.store.getState();
    try {
      if (user && selectedChat) {
        this.socketData.chatId = selectedChat;
        this.socketData.userId = (user as UserData).id;
        const { token } = await getUserToken(selectedChat);
        this.socketData.token = token;
        this.socket = new Socket(this.socketData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  sendMessage(mess: Message) {
    this.socket?.send(mess);
  }

  pushMessage(message: MessageData | MessageData[]) {
    let newMessages: MessageData[] = [];
    const { selectedChatMessages } = window.store.getState();
    if (Array.isArray(message)) {
      newMessages = [...message].reverse();
    } else {
      newMessages = [...selectedChatMessages, message];
      arrangeLastMessage(message);
    }
    window.store.set({ selectedChatMessages: newMessages });
  }

  disconnect() {
    this.socket?.closeConnect();
  }
}

export const wsService = new WSService();
