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

  async changeAvatar(data: FormData): Promise<UserData | ApiError> {
    return this.http.put<UserData>("/profile/avatar", { data });
  }

  async searchUsers(data: { login: string }): Promise<UserData[] | ApiError> {
    return this.http.post<UserData[]>("/search", { data });
  }

  async getUserById(id: number): Promise<UserData | ApiError> {
    return this.http.get<UserData>(`/${id}`);
  }
}

export const userApi = new UserApi();
