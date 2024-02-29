import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth.reducer'
import errorsReducer from './reducers/errors.reducer'
import postReducer from './reducers/post.reducer'
import postsReducer from './reducers/posts.reducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorsReducer,
    posts: postsReducer,
    post: postReducer
  },
})