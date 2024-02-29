import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  token: '',
  id: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth: (state) => {
      if (localStorage.getItem('token')) {
        //state.token = localStorage.getItem('token');

        return {
          ...state,
          token: localStorage.getItem('token'),
          username: localStorage.getItem('username') || '',
          id: localStorage.getItem('id') || 0,
        };
      }
    },
    auth: (state, action) => {
      const { username, token, id } = action.payload;
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
      localStorage.setItem('id', id);
      // state.token = token;
      // state.username = username;
      // state.id = id;

      return { ...state, token, username, id };
    },
    logout: (state) => {
      // state = { ...initialState };
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      return { ...initialState };
    },
  },
});

export const { logout, auth, checkAuth } = authSlice.actions;
export default authSlice.reducer;
