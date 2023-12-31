import { chatApi } from "../api/chatApi";
import { ApiError, UserChatData } from "../api/types";
import { RESOURCES_URL } from "../config";
import { wsService } from "./wsService";

export const getChats = async () => {
  try {
    const response = chatApi.getChats();
    return (await response).map((chat) => {
      return {
        ...chat,
        avatar: chat.avatar ? `${RESOURCES_URL}${chat.avatar}` : null,
        last_message: chat.last_message
          ? {
              ...chat.last_message,
              user: {
                ...chat.last_message.user,
                avatar: chat.last_message.user.avatar
                  ? `${RESOURCES_URL}${chat.last_message.user.avatar}`
                  : null,
              },
            }
          : null,
      };
    });
  } catch (error: unknown) {
    console.log((error as ApiError).reason);
  }
};

export const createChat = async (title: string) => {
  try {
    await chatApi.createChat({ title });
    const chats = await getChats();
    window.store.set({ chats });
  } catch (error: unknown) {
    console.log((error as ApiError).reason);
  }
};

export const getChatUsers = async (id: number) => {
  try {
    const response = (await chatApi.getChatUsers(id)) as UserChatData[];
    return response.map((item) => ({
      ...item,
      avatar: item.avatar ? `${RESOURCES_URL}${item.avatar}` : null,
    }));
  } catch (error: unknown) {
    console.log((error as ApiError).reason);
  }
};

export const getUserToken = async (chatId: number) => {
  try {
    const response = (await chatApi.getUserToken(chatId)) as {
      token: string;
    };
    return response.token;
  } catch (error: unknown) {
    console.log((error as ApiError).reason);
  }
};

export const setChat = async (chatId: number) => {
  try {
    const chatUsers = await getChatUsers(chatId);
    window.store.set({ selectedChat: chatId, selectedChatUsers: chatUsers });
    wsService.disconnect();
    wsService.connect();
  } catch (error: unknown) {
    console.log((error as ApiError).reason);
  }
};

export const editChatAvatar = async (file: File) => {
  const data = new FormData();
  const { selectedChat } = window.store.getState();
  data.append("avatar", file);
  data.set("chatId", String(selectedChat));
  try {
    await chatApi.changeChatAvatar(data);
    const chats = await getChats();
    window.store.set({ chats });
  } catch (error: unknown) {
    console.log(error);
  }
};

export const deleteChat = async () => {
  const { chats, selectedChat } = window.store.getState();
  try {
    if (selectedChat) {
      await chatApi.deleteChat({ chatId: selectedChat });
      window.store.set({
        chats: chats.filter((chat) => chat.id !== selectedChat),
        selectedChat: null,
      });
    }
  } catch (error: unknown) {
    console.log((error as ApiError).reason);
  }
};

export const sendMessage = async (message: string) => {
  try {
    const mess = {
      content: message,
      type: "message",
    };
    wsService?.sendMessage(mess);
  } catch (error: unknown) {
    console.log((error as ApiError).reason);
  }
};

export const addUserToChat = async (data: UserChatData) => {
  const { selectedChat, selectedChatUsers } = window.store.getState();
  try {
    if (selectedChat && data) {
      await chatApi.addUsersToChat({
        users: [data.id],
        chatId: selectedChat,
      });
      const newSelectedChatUsers = [...selectedChatUsers, data];
      window.store.set({ selectedChatUsers: newSelectedChatUsers });
    }
  } catch (error: unknown) {
    console.log((error as ApiError).reason);
  }
};

export const deleteUserFromChat = async (data: UserChatData) => {
  const { selectedChat, selectedChatUsers } = window.store.getState();
  try {
    if (selectedChat && data) {
      await chatApi.deleteUsersFromChat({
        users: [data.id],
        chatId: selectedChat,
      });

      const newSelectedChatUsers = selectedChatUsers.filter(
        (user) => user.id !== data.id
      );
      window.store.set({ selectedChatUsers: newSelectedChatUsers });
    }
  } catch (error: unknown) {
    console.log((error as ApiError).reason);
  }
};
