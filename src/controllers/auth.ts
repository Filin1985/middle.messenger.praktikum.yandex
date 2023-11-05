import { authApi } from "../api/authApi";
import { chatApi } from "../api/chatApi";
import { ApiError, LoginData, SignupData } from "../api/types";
import Router from "../core/Router";

export const signup = async (data: SignupData) => {
  try {
    await authApi.signup(data);

    const user = await authApi.getUser();
    const chats = await chatApi.getChats();
    window.store.set({ user: user, chats });
    Router.go("/messenger");
  } catch (error: unknown) {
    throw new Error((error as ApiError).reason);
  }
};

export const login = async (data: LoginData) => {
  try {
    await authApi.login(data);

    const user = await authApi.getUser();
    const chats = await chatApi.getChats();
    window.store.set({ user: user, chats });
    Router.go("/messenger");
  } catch (error) {
    throw new Error((error as ApiError).reason);
  }
};

export const logout = async () => {
  try {
    await authApi.logout();
    window.store.set({ user: null });
  } catch (error) {
    throw new Error((error as ApiError).reason);
  }
};

export const getUserInfo = async () => {
  try {
    const user = await authApi.getUser();
    window.store.set({ user: user });
    return user;
  } catch (error: unknown) {
    throw new Error((error as ApiError).reason);
  }
};
