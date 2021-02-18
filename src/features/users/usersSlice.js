import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersIDB, addUserIDB, deleteUserIDB } from "./indexedDB";

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

const options = {
  name: "users",
  initialState: {
    users: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // fetch users
    [fetchUsersAsync.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = true;
    },
    [fetchUsersAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      const users = action.payload;
      state.users.push(...users);
    },
    [fetchUsersAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    // add user
    [addUserAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      const user = action.payload;
      state.users.push(user);
    },
    // delete user
    [deleteUserAsync.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.hasError = false;
      state.users = state.users.filter(
        user => user.username !== action.username
      );
    },
  },
};

const usersSlice = createSlice(options);

// selectors
export const selectAllUsers = state => state.users.users;

export default usersSlice.reducer;
