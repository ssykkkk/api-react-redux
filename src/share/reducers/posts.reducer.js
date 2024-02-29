import { createSlice } from '@reduxjs/toolkit';

const initialState = { posts: [], idPost: 0, isDeleted: false };

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getAllPosts: (state, action) => {
      return { ...state, posts: [...action.payload] };
    },
    createPost: (state, action) => {
      return { ...state, idPost: action.payload.id || 0 };
    },
    resetPostId: (state) => {
      return { ...state, idPost: 0 };
    },
    deletePost: (state, action) => {
      return { ...state, isDeleted: action.payload };
    },
  },
});

export const { getAllPosts, createPost, resetPostId, deletePost } =
  postsSlice.actions;
export default postsSlice.reducer;
