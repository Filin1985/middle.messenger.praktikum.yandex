import { API } from "./api";
import { ApiError, UserData, EditUserData, PasswordData } from "./types";

export default class UserApi extends API {
  constructor() {
    super("/user");
  }

  async editProfile(data: EditUserData): Promise<UserData | ApiError> {
    return this.http.put<UserData>("/profile", { data });
  }

  async changePassword(data: PasswordData): Promise<void | ApiError> {
    return this.http.put<void>("/password", { data });
  }
}

export const userApi = new UserApi();
