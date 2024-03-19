import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchLoadChats } from '../App/api';
import type { Action, ChatState } from './types';

const initialState: ChatState = {
  dialogs: [],
  error: undefined,
  loading: true,
};

export const loadChats = createAsyncThunk('chats/load', () => fetchLoadChats());
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: Action): void => {
      const dialog = state.dialogs.find((dial) => dial.id === action.payload.dialogId);
      if (dialog) {
        if (!dialog.Messages) {
          dialog.Messages = [];
        }
        dialog.Messages.push(action.payload);
      }
    },
    addDialog: (state, action) => {
      console.log(state.dialogs, 'sssssssllllllll');
      console.log(action.payload, 'ssssssssllllllllllll');

      state.dialogs.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadChats.fulfilled, (state, action) => {
        state.dialogs = action.payload;
      })
      .addCase(loadChats.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { addMessage, addDialog } = chatSlice.actions;
export default chatSlice.reducer;
