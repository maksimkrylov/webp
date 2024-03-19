import type { User } from '../Page/SignPage/types';

export type Message = {
  id: number;
  senderId: number;
  receiverId: number;
  dialogId: number;
  content: string;
  createdAt: string;
};

export type Dialog = {
  User1?: User;
  User2?: User;
  id: number;
  userId1: number;
  userId2: number;
  Messages: Message[];
};

export type ChatState = {
  dialogs: Dialog[];
  error: string | undefined;
  loading: boolean;
};

export type Action = {
  payload: Message;
};
