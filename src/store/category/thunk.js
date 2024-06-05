import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategory } from "../../helpers/backend_helper";

export const getCategory = createAsyncThunk(
  "getCategory",
  async ({ values }, { rejectWithValue }) => {
    try {
      // Call the fetchCategory function to authenticate user
      const response = await fetchCategory(values);

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
