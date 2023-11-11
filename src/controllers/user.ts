import { userApi } from "../api/userApi";
import { ApiError, EditUserData, PasswordData, UserData } from "../api/types";
import Router from "../core/Router";
import { RESOURCES_URL } from "../config";

export const editProfileData = async (data: EditUserData) => {
  try {
    const response = (await userApi.editProfile(data)) as UserData;
    window.store.set({
      user: {
        ...response,
        avatar: response.avatar ? `${RESOURCES_URL}${response.avatar}` : null,
      },
    });
    Router.go("/settings");
  } catch (error: unknown) {
    console.log((error as ApiError).reason);
  }
};

export const editPasswordData = async (data: PasswordData) => {
  try {
    await userApi.changePassword(data);
    Router.go("/settings");
  } catch (error: unknown) {
    console.log((error as ApiError).reason);
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
        avatar: response.avatar ? `${RESOURCES_URL}${response.avatar}` : null,
      },
    });
    Router.go("/settings");
  } catch (error: unknown) {
    console.log((error as ApiError).reason);
  }
};

export const searchUsers = async (data: { login: string }) => {
  try {
    const response = (await userApi.searchUsers(data)) as UserData[];
    window.store.set({
      searchedUsersChats: response,
    });
  } catch (error: unknown) {
    console.log((error as ApiError).reason);
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await userApi.getUserById(id);
    return response;
  } catch (error: unknown) {
    console.log((error as ApiError).reason);
  }
};

export const getOwner = async (id: number) => {
  try {
    const response = (await userApi.getUserById(id)) as UserData;
    const { user } = window.store.getState();
    if (response && user) {
      return response.id === (user as UserData).id;
    }
  } catch (error: unknown) {
    console.log((error as ApiError).reason);
  }
};
