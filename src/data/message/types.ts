export type FileType = {
  id: number;
  path: string;
  size: number;
  content_type: string;
};

export type MessageType = {
  id: number;
  chat_id: number;
  time: string;
  type: string;
  text: string;
  user_id: number;
  file?: FileType;
  current_user?: boolean;
  avatar?: string;
};
