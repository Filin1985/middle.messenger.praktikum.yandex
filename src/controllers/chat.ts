import { chatApi } from "../api/chatApi";
import { ApiError } from "../api/types";

export const getChats = async () => {
  try {
    const response = chatApi.getChats();
    return response;
  } catch (error: unknown) {
    throw new Error((error as ApiError).reason);
  }
};
