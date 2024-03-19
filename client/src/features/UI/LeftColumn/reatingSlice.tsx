/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoadReating } from '../../App/api';
import type { ReatingState } from './types';

const initialState: ReatingState = {
  reating: [],
  error: undefined,
};

export const loadReating = createAsyncThunk('reating/load', () => fetchLoadReating());

const reatingSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadReating.fulfilled, (state, action) => {
        state.reating = action.payload;
      })
      .addCase(loadReating.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default reatingSlice.reducer;
