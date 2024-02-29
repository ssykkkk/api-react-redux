import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError } from '../reducers/errors.reducer';
import { url } from '../url';
import axios from 'axios';
import { getPost } from '../reducers/post.reducer';

export const fetchGetPostData = createAsyncThunk(
  'post-get-data',
  async (slug, { dispatch }) => {
    try {
      const res = await axios.get(url + '/articles/' + slug, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${localStorage.getItem('token')}`,
        },
      });

      dispatch(getPost(res.data.article));
 
    } catch (e) {
      if (e.response) {
        dispatch(setError(e.response.data));
        return;
      }
      dispatch(setError(e));
    }
  }
);


export const fetchChangePostData = createAsyncThunk(
  'post-change-data',
  async ({ slug, body }, { dispatch }) => {
    try {
      const res = await axios.put(url + '/articles/' + slug,
      { article: { ...body } },
        {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${localStorage.getItem('token')}`,
        },
      });

      //dispatch(getPost(res.data.article));
      console.log(res.status)
      return res.status;
 
    } catch (e) {
      if (e.response) {
        dispatch(setError(e.response.data));
        return;
      }
      dispatch(setError(e));
    }
  }
);
