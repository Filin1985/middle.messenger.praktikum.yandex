import { MessageData, UserData } from "../api/types";
import Socket, { Message, WebSocketProps } from "../core/WSocket";
import { getUserById } from "./user";
import { getUserToken } from "./chat";

const setLastMessage = async (message: MessageData) => {
  const { chats, selectedChat } = window.store.getState();
  if (chats && selectedChat) {
    const chat = chats.find((c) => c.id === selectedChat);
    if (chat) {
      const newChat = { ...chat };
      const user = (await getUserById(message.user_id)) as UserData;
      newChat.last_message = {
        ...message,
        user,
      };
      window.store.set({ chats: chats.map((c) => (c === chat ? newChat : c)) });
    }
  }
};

class WSService {
  static __instance: WSService | undefined;

  protected socket: Socket | null = null;

  protected socketProps: WebSocketProps = {
    userId: 0,
    chatId: 0,
    token: "",
    callbackMessages: (data: MessageData | MessageData[]) => {
      this.addMessage(data);
    },
  };

  constructor() {
    if (WSService.__instance) {
      return WSService.__instance;
    }

    WSService.__instance = this;
  }

  async connect() {
    const { user, selectedChat } = window.store.getState();
    if (user && selectedChat) {
      this.socketProps.userId = (user as UserData).id;
      this.socketProps.chatId = selectedChat;
      console.log(selectedChat);
      const { token } = await getUserToken(selectedChat);

      this.socketProps.token = token;

      this.socket = new Socket(this.socketProps);
    }
  }

  disconnect() {
    this.socket?.closeConnect();
  }

  sendMessage(mess: Message) {
    this.socket?.send(mess);
  }

  addMessage(message: MessageData | MessageData[]) {
    const { selectedChatMessages } = window.store.getState();
    let newChatMessages: MessageData[] = [];
    if (Array.isArray(message)) {
      newChatMessages = [...message].reverse();
    } else {
      newChatMessages = [...selectedChatMessages, message];
      setLastMessage(message);
    }
    window.store.set({ selectedChatMessages: newChatMessages });
  }
}

export const wsService = new WSService();
