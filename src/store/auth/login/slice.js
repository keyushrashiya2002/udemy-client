import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./thunk";

const initialState = {
  error: "",
  loading: false,
};

const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetLoginFlag: (state) => {
      state.error = "";
      state.loading = false;
    },
    setApiError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred during login";
      });
  },
});

export const { resetLoginFlag, setApiError } = slice.actions;
export default slice.reducer;
