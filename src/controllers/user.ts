import { userApi } from "../api/userApi";
import { ApiError, EditUserData, PasswordData, UserData } from "../api/types";
import Router from "../core/Router";

export const editProfileData = async (data: EditUserData) => {
  try {
    const response = (await userApi.editProfile(data)) as UserData;
    window.store.set({
      user: {
        ...response,
        avatar: response.avatar
          ? `https://ya-praktikum.tech/api/v2/resources${response.avatar}`
          : null,
      },
    });
    Router.go("/profile");
  } catch (error: unknown) {
    throw new Error((error as ApiError).reason);
  }
};

export const editPasswordData = async (data: PasswordData) => {
  try {
    await userApi.changePassword(data);
    Router.go("/profile");
  } catch (error: unknown) {
    throw new Error((error as ApiError).reason);
  }
};

export const editAvatar = async (file: File) => {
  const data = new FormData();
  data.append("avatar", file);
  try {
    const response = (await userApi.changeAvatar(data)) as UserData;
    window.store.set({
      user: {
        ...response,
        avatar: response.avatar
          ? `https://ya-praktikum.tech/api/v2/resources${response.avatar}`
          : null,
      },
    });
    console.log(window.store);
    Router.go("/profile");
  } catch (error: unknown) {
    throw new Error((error as ApiError).reason);
  }
};

export const searchUsers = async (data: { login: string }) => {
  try {
    const response = (await userApi.searchUsers(data)) as UserData[];
    window.store.set({
      searchedUsersChats: response,
    });
  } catch (error: unknown) {
    throw new Error((error as ApiError).reason);
  }
};
