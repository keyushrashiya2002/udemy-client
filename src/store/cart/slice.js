// Import statements for fetchCart function and createAsyncThunk
import { createSlice } from "@reduxjs/toolkit";
import { deleteCart, getCart, postCart, updateCart } from "./thunk";

// Initial state definition
let initialState = {
  isSubmitting: false,
  formError: {},
  success: null,
  loading: false,
  error: null,
  data: [],
  itemDetails: {},

  filter: {},
};

// Create slice
const slice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    setCartFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    resetCartFormError: (state, action) => {
      state.success = null;
    },
  },
  // Extra reducers to handle async actions
  extraReducers: (builder) => {
    builder
      .addCase(postCart.pending, (state) => {
        state.isSubmitting = true;
        state.formError = {};
        state.success = null;
      })
      .addCase(postCart.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.data.push(action.payload.data);
        state.success = action.payload.message;
        state.formError = {};
      })
      .addCase(postCart.rejected, (state, action) => {
        state.isSubmitting = false;
        state.formError = action.payload;
        state.success = null;
      })
      .addCase(updateCart.pending, (state) => {
        state.isSubmitting = true;
        state.formError = {};
        state.success = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.data = state.data.map((item) =>
          item._id === action.payload.data._id
            ? { ...item, quantity: action.payload.data.quantity }
            : item
        );
        state.success = action.payload.message;
        state.formError = {};
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isSubmitting = false;
        state.formError = action.payload;
        state.success = null;
      })
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error && action.error.message
            ? action.payload || action.payload.message
            : "An error occurred during fetch cart";
      })
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (item) => item._id !== action.payload.data
        );
        state.error = null;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error && action.error.message
            ? action.payload || action.payload.message
            : "An error occurred during fetch cart";
      });
  },
});

export const { setCartFilter, resetCartFormError } = slice.actions;
export default slice.reducer;
