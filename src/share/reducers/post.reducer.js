import { createSlice } from '@reduxjs/toolkit';
const initialState = {};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPost: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { getPost } = postSlice.actions;
export default postSlice.reducer;
