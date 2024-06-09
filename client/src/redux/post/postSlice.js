import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    fetchPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createPostStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createPostSuccess: (state, action) => {
      state.posts = [action.payload, ...state.posts]; // Use destructuring to add the new post
      state.loading = false;
      state.error = null;
    },
    createPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  createPostFailure,
  createPostStart,
  createPostSuccess,
} = postsSlice.actions;

export default postsSlice.reducer;
