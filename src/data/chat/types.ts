export type ChatType = {
  id: number;
  chat_id: number;
  time: string;
  type: string;
  text: string;
  avatar: string;
  user_id: number;
  user_name: string;
  unread?: number;
};
