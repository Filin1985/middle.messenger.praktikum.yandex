export type SignupData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type LoginData = Pick<SignupData, "login" | "password">;
export type UserData = SignupData & {
  id: string;
  display_name: string;
  avatar: "string";
};

export type EditUserData = Omit<SignupData, "password" | "avatar"> & {
  display_name: string;
};

export type SignupResponse = {
  id: number;
};

export type ApiError = {
  reason: string;
};

export type ChatsResponse = {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: LastMessage | null;
};

type LastMessage = {
  user: UserData;
  time: string;
  content: string;
};

export type PasswordData = {
  oldPassword: string;
  newPassword: string;
};
