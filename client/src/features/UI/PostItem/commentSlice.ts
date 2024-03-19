// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import type { CommentAdd, CommentState } from './types';
// import { fetchAddComment } from '../../App/api';

// const initialState: CommentState = {
//   comment: [],
//   error: undefined,
// };



// const commentSlice = createSlice({
//   name: 'comment',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = undefined;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(AddComment.fulfilled, (state, action) => {
//         state.comment.push(action.payload);
//       })
//       .addCase(AddComment.rejected, (state, action) => {
//         state.error = action.error.message;
//       });
//   },
// });

// export default commentSlice.reducer;
