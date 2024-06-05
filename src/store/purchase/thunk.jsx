import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPurchase, fetchPurchase } from "../../helpers/backend_helper";

export const postPurchase = createAsyncThunk(
  "postPurchase",
  async (values, { rejectWithValue }) => {
    try {
      // Call the fetchPurchase function to authenticate user

      const response = await createPurchase(values);

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

export const getPurchase = createAsyncThunk(
  "getPurchase",
  async (values, { rejectWithValue, getState }) => {
    try {
      const { filter } = getState().Purchase;
      // Call the fetchPurchase function to authenticate user
      const response = await fetchPurchase({ ...values, ...filter });

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
