import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsersAsync = createAsyncThunk(
  "users/fetchUsersAsync",
  async () => {
    // TODO: call to IDB
  }
);

export const addUserAsync = createAsyncThunk(
  "users/addUserAsync",
  async users => {
    // TODO: call to IDB
  }
);

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUserAsync",
  async users => {
    // TODO: call to IDB
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
  extraReducers: {},
};

const usersSlice = createSlice(options);

export default usersSlice.reducer;
