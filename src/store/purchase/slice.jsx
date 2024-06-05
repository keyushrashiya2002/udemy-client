// Import statements for Purchase function and createAsyncThunk
import { createSlice } from "@reduxjs/toolkit";
import { getPurchase } from "./thunk";

// Initial state definition
let initialState = {
  loading: false,
  error: null,
  success: null,
  data: [],
  pagination: {},
  filter: {},
};

// Create slice
const slice = createSlice({
  name: "Purchase",
  initialState,
  reducers: {
    setPurchaseFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    resetPurchaseFilter: (state) => {
      state.filter = {};
    },
  },
  // Extra reducers to handle async actions
  extraReducers: (builder) => {
    builder
      .addCase(getPurchase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPurchase.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(getPurchase.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error && action.error.message
            ? action.payload || action.payload.message
            : "An error occurred during fetch purchase";
      });
  },
});

export const { setPurchaseFilter, resetPurchaseFilter } = slice.actions;
export default slice.reducer;
