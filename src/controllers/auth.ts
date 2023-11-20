import { authApi } from "../api/authApi";
import { chatApi } from "../api/chatApi";
import { ApiError, LoginData, SignupData, UserData } from "../api/types";
import { RESOURCES_URL } from "../config";
import Router from "../core/Router";

export const signup = async (data: SignupData) => {
  try {
    await authApi.signup(data);

    const response = (await authApi.getUser()) as UserData;
    const chats = await chatApi.getChats();
    window.store.set({
      user: {
        ...response,
        avatar: response.avatar ? `${RESOURCES_URL}${response.avatar}` : null,
      },
      chats,
    });
    Router.go("/messenger");
  } catch (error: unknown) {
    console.log((error as ApiError).reason);
  }
};

export const login = async (data: LoginData) => {
  try {
    await authApi.login(data);

    const response = (await authApi.getUser()) as UserData;
    const chats = await chatApi.getChats();
    window.store.set({
      user: {
        ...response,
        avatar: response.avatar ? `${RESOURCES_URL}${response.avatar}` : null,
      },
      chats,
    });
    Router.go("/messenger");
  } catch (error) {
    if ((error as ApiError).reason === "User already in system") {
      Router.go("/messenger");
      return;
    }
    console.log((error as ApiError).reason);
  }
};

export const logout = async () => {
  try {
    await authApi.logout();
    Router.go("/");
    window.store.set({ user: null });
  } catch (error) {
    console.log((error as ApiError).reason);
  }
};

export const getUserInfo = async () => {
  try {
    const response = (await authApi.getUser()) as UserData;
    window.store.set({
      user: {
        ...response,
        avatar: response.avatar ? `${RESOURCES_URL}${response.avatar}` : null,
      },
    });
    return response;
  } catch (error: unknown) {
    console.log((error as ApiError).reason);
  }
};
