import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUsersIDB,
  addUserIDB,
  deleteUserIDB,
  updateUserIDB,
} from "./indexedDB";

export const fetchUsersAsync = createAsyncThunk(
  "users/fetchUsersAsync",
  async () => {
    const users = (await fetchUsersIDB()) || [];
    return users;
  }
);

export const addUserAsync = createAsyncThunk(
  "users/addUserAsync",
  async user => {
    await addUserIDB(user);
    return user;
  }
);

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUserAsync",
  async username => {
    await deleteUserIDB(username);
    return username;
  }
);

export const updateUserAsync = createAsyncThunk(
  "users/updateUserAsync",
  async payload => {
    const { key, user } = payload;
    await updateUserIDB(key, user);
    payload.history.push(`/users/${user.username}`);
    return payload;
  }
);

const options = {
  name: "users",
  initialState: {
    users: [],
    isLoading: true,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // fetch users
    [fetchUsersAsync.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchUsersAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.users = action.payload;
    },
    [fetchUsersAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    // add user
    [addUserAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.users.push(action.payload);
    },
    // delete user
    [deleteUserAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.users = state.users.filter(u => u.username !== action.payload);
    },
    // update user
    [updateUserAsync.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateUserAsync.fulfilled]: (state, action) => {
      const { user } = action.payload;
      state.isLoading = false;
      state.hasError = false;
      state.users = state.users.map(u =>
        u.username === user.username ? user : u
      );
    },
    [updateUserAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
};

const usersSlice = createSlice(options);

// selectors
export const selectAllUsers = state => state.users.users;
export const selectIsLoading = state => state.users.isLoading;

export default usersSlice.reducer;
