import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCart,
  destroyCart,
  fetchCart,
  patchCartDetail,
} from "../../helpers/backend_helper";

export const postCart = createAsyncThunk(
  "postCart",
  async (values, { rejectWithValue }) => {
    try {
      // Call the fetchCart function to authenticate user

      const response = await createCart(values);

      // Return response data
      return response.data;
    } catch (error) {
      // Handle errors
      const errorMessage =
        error.response?.data || // Check if error message is available in response
        error.message || // Otherwise, use generic error message
        "Oops! Something went wrong.";

      // Reject with error message
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateCart = createAsyncThunk(
  "updateCart",
  async (values, { rejectWithValue }) => {
    try {
      // Call the fetchCart function to authenticate user
      const response = await patchCartDetail(values);

      // Return response data
      return response.data;
    } catch (error) {
      // Handle errors
      const errorMessage =
        error.response?.data || // Check if error message is available in response
        error.message || // Otherwise, use generic error message
        "Oops! Something went wrong.";

      // Reject with error message
      return rejectWithValue(errorMessage);
    }
  }
);

export const getCart = createAsyncThunk(
  "getCart",
  async ({ values }, { rejectWithValue }) => {
    try {
      // Call the fetchCart function to authenticate user
      const response = await fetchCart(values);

      // Return response data
      return response.data;
    } catch (error) {
      // Handle errors
      const errorMessage =
        error.response?.data?.message || // Check if error message is available in response
        error.message || // Otherwise, use generic error message
        "Oops! Something went wrong.";

      // Reject with error message
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "deleteCart",
  async (values, { rejectWithValue }) => {
    try {
      // Call the fetchCart function to authenticate user
      const response = await destroyCart(values);

      // Return response data
      return response.data;
    } catch (error) {
      // Handle errors
      const errorMessage =
        error.response?.data?.message || // Check if error message is available in response
        error.message || // Otherwise, use generic error message
        "Oops! Something went wrong.";

      // Reject with error message
      return rejectWithValue(errorMessage);
    }
  }
);
