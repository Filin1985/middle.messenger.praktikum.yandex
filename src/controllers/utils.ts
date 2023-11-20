import { MessageData, UserData } from "../api/types";
import { getUserById } from "./user";

export const arrangeLastMessage = async (message: MessageData) => {
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
