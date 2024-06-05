import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./thunk";

const initialState = {
  registrationError: {},
  loading: false,
  user: null,
  success: false,
  error: false,
};

const slice = createSlice({
  name: "Register",
  initialState,
  reducers: {
    resetRegisterFlag: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
        state.registrationError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.registrationError =
          action.payload.data || "An error occurred during register";
        state.error = true;
      });
  },
});

export const { resetRegisterFlag } = slice.actions;
export default slice.reducer;
