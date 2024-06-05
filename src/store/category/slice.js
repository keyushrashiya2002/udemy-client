// Import statements for fetchCategory function and createAsyncThunk
import { createSlice } from "@reduxjs/toolkit";
import { getCategory } from "./thunk";

// Initial state definition
let initialState = {
  success: null,
  loading: false,
  error: null,
  data: [],
};

// Create slice
const slice = createSlice({
  name: "Category",
  initialState,
  // Extra reducers to handle async actions
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error && action.error.message
            ? action.payload || action.payload.message
            : "An error occurred during fetch category";
      });
  },
});

export default slice.reducer;
