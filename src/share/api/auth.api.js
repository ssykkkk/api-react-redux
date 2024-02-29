import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../reducers/auth.reducer';
import { setError } from '../reducers/errors.reducer';
import { url } from '../url';
import axios from 'axios';

export const fetchAuth = createAsyncThunk(
  'auth',
  async ({ body, path }, { dispatch }) => {
    try {
      const res = await axios.post(
        url + path,
        { user: { ...body } },
        { headers: { 'Content-Type': 'application/json' } }
      );
      dispatch(auth(res.data.user));
    } catch (e) {
      if (e.response) {
        dispatch(setError(e.response.data));
        return;
      }
      dispatch(setError(e));
    }
  }
);
