import { API } from "./api";
import {
  SignupData,
  LoginData,
  UserData,
  SignupResponse,
  ApiError,
} from "./types";

export default class AuthApi extends API {
  constructor() {
    super("/auth");
  }

  async signup(data: SignupData): Promise<SignupResponse> {
    return this.http.post("/signup", { data });
  }

  async login(data: LoginData): Promise<void | ApiError> {
    return this.http.post("/signin", { data });
  }

  async getUser(): Promise<UserData | ApiError> {
    return this.http.get("/user");
  }

  async logout(): Promise<void | ApiError> {
    return this.http.post("/logout");
  }
}

export const authApi = new AuthApi();
