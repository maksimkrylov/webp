/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PostId, PostSort, PostsState } from './types';
import {
  fetchAddComment,
  fetchAddFavoritesPost,
  fetchAddLikePost,
  fetchAddPosts,
  fetchDelComment,
  fetchDelLikePost,
  fetchDisFavoritesPost,
  fetchLoadPosts,
  fetchLoadSortPosts,
  fetchPostRemove,
} from '../../App/api';
import type { User, UserId } from '../SignPage/types';
import type { CommentAdd, CommentId } from '../../UI/PostItem/types';

const initialState: PostsState = {
  posts: [],
  error: undefined,
};

export const loadPosts = createAsyncThunk('posts/load', () => fetchLoadPosts());

export const AddPosts = createAsyncThunk('post/add', (formData: FormData) =>
  fetchAddPosts(formData),
);
export const DelPost = createAsyncThunk('post/del', (postId: PostId) => fetchPostRemove(postId));
export const loadSortPosts = createAsyncThunk('post/sort', (text: PostSort) =>
  fetchLoadSortPosts(text),
); //
export const AddComment = createAsyncThunk('comment/add', (comment: CommentAdd) =>
  fetchAddComment(comment),
);
export const DelComment = createAsyncThunk(
  'comment/del',
  (commentDel: { commentId: CommentId; postId: PostId }) => fetchDelComment(commentDel),
);

export const LikePost = createAsyncThunk(
  'post/like',
  (payload: { postId: PostId; userId: UserId; like: number }) => {
    const { postId, userId, like } = payload;
    return fetchAddLikePost({ postId, userId, like });
  },
);

export const DisLikePost = createAsyncThunk(
  'post/dislike',
  (payload: { postId: PostId; userId: UserId }) => {
    const { postId, userId } = payload;
    console.log(postId, userId, 4555555);

    return fetchDelLikePost(postId, userId);
  },
);

export const FavoritesPost = createAsyncThunk(
  'post/favorites',
  (payload: { postId: PostId; userId: UserId }) => {
    const { postId, userId } = payload;
    return fetchAddFavoritesPost({ postId, userId });
  },
);

export const DisFavoritesPost = createAsyncThunk(
  'post/disfavorites',
  (payload: { postId: PostId; userId: UserId }) => {
    const { postId, userId } = payload;
    console.log(postId, userId, 'postslice');

    return fetchDisFavoritesPost(postId, userId);
  },
);

const authSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = undefined;
    },
    profileEdit: (state, action: { type: string; payload: User }) => {
      state.posts = state.posts.map((post) =>
        post.userId === action.payload.id ? { ...post, User: action.payload } : post,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loadSortPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(loadSortPosts.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(AddPosts.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(AddPosts.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(DelPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== +action.payload);
      })
      .addCase(DelPost.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(LikePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post.id === +action.payload.id ? action.payload : post,
        );
      })
      .addCase(LikePost.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(FavoritesPost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post.id === +action.payload.id ? action.payload : post,
        );
      })
      .addCase(FavoritesPost.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(DisFavoritesPost.fulfilled, (state, action) => {
        console.log(action.payload.userId);

        state.posts = state.posts.map((post) =>
          post.id === +action.payload.postId
            ? {
                ...post,
                Favorites: post.Favorites.filter(
                  (favorites) => +favorites.userId !== +action.payload.userId,
                ),
              }
            : post,
        );
      })
      .addCase(DisFavoritesPost.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(AddComment.fulfilled, (state, action) => {
        state.posts.forEach((post, idx, arr) => {
          post.id === +action.payload.id ? (arr[idx].Comments = action.payload.Comments) : post;
        });
      })
      .addCase(AddComment.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(DelComment.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post.id === +action.payload.postId
            ? {
                ...post,
                Comments: post.Comments.filter(
                  (comment) => comment.id !== +action.payload.commentId,
                ),
              }
            : post,
        );
      })
      .addCase(DelComment.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(DisLikePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post.id === +action.payload.postId
            ? {
                ...post,
                PostLikes: post.PostLikes.filter((like) => like.userId !== action.payload.userId),
              }
            : post,
        );
      })
      .addCase(DisLikePost.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { profileEdit } = authSlice.actions;
export default authSlice.reducer;
