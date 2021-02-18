import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
