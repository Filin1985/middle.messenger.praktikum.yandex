import { userApi } from "../api/userApi";
import { ApiError, EditUserData, PasswordData } from "../api/types";
import Router from "../core/Router";

export const editProfileData = async (data: EditUserData) => {
  try {
    const response = await userApi.editProfile(data);
    window.store.set({ user: response });
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
