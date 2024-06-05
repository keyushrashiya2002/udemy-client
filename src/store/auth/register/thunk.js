import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRegister } from "../../../helpers/backend_helper";

export const registerUser = createAsyncThunk(
  "registerUser",
  async ({ values }, { rejectWithValue }) => {
    try {
      // Call the postRegister function to authenticate user
      await postRegister(values);

      // Return response data
      return values;
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
