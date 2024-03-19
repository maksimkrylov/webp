import type { User } from '../../Page/SignPage/types';

export type Comment = {
  id: number;
  postId: number;
  userId: number;
  content: string;
  likes: number;
  User: User;
  parentId: number;
};

export type CommentAdd = {
  postId: number;
  userId: number;
  content: string;
};

export type CommentId = Comment['id'];

export type CommentState = {
  comment: Comment[];
  error: string | undefined;
};
