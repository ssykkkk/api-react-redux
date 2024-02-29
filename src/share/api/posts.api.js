import { createAsyncThunk } from '@reduxjs/toolkit';

import { setError } from '../reducers/errors.reducer';
import { url } from '../url';
import axios from 'axios';
import {
  createPost,
  getAllPosts,
  resetPostId,
  deletePost,
} from '../reducers/posts.reducer';

export const fetchPosts = createAsyncThunk(
  'posts-get',
  async (_, { dispatch }) => {
    try {
      const res = await axios.get(url + '/articles', {
        headers: { 'Content-Type': 'application/json' },
      });
      dispatch(getAllPosts(res.data.articles));
    } catch (e) {
      if (e.response) {
        dispatch(setError(e.response.data));
        return;
      }
      dispatch(setError(e));
    }
  }
);

export const fetchCreatePost = createAsyncThunk(
  'post-create',
  async (body, { dispatch }) => {
    try {
      const res = await axios.post(
        url + '/articles',
        { article: { ...body } },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(createPost(res.data.article));
      setTimeout(() => {
        dispatch(resetPostId());
      }, 5000);
    } catch (e) {
      if (e.response) {
        dispatch(setError(e.response.data));
        return;
      }
      dispatch(setError(e));
    }
  }
);

export const fetchDeletePost = createAsyncThunk(
  'post-delete',
  async ({ slug }, { dispatch }) => {
    try {
      const res = await axios.delete(url + '/articles/' + slug, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${localStorage.getItem('token')}`,
        },
      });
      dispatch(deletePost(true));

      setTimeout(() => {
        dispatch(deletePost(false));
      }, 5000);
    } catch (e) {
      if (e.response) {
        dispatch(setError(e.response.data));
        return;
      }
      dispatch(setError(e));
    }
  }
);
