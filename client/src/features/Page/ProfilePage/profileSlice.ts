import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchEditProfile, fetchLoadProfiles } from '../../App/api';
import type { ProfileState, User } from '../SignPage/types';

const initialState: ProfileState = {
  profiles: [],
  error: undefined,
  loading: true,
};

export const editProfile = createAsyncThunk('profile/edit', (formData: FormData) =>
  fetchEditProfile(formData),
);

export const loadProfiles = createAsyncThunk('profiles/load', () => fetchLoadProfiles());

const profilesSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    stopLoading: (state) => {
      state.loading = false;
    },
    fielUsers: (state, action) => {
      state.profiles.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProfiles.fulfilled, (state, action) => {
        state.profiles = action.payload;
      })
      .addCase(loadProfiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadProfiles.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.profiles = state.profiles.map((profile) =>
          profile.id === +action.payload.id ? action.payload : profile,
        );
      })
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { stopLoading, fielUsers } = profilesSlice.actions;

export default profilesSlice.reducer;
