import { createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin } from "../../../helpers/backend_helper";

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ values, history }, { rejectWithValue }) => {
    try {
      // Call the postLogin function to authenticate user
      const response = await postLogin(values);

      // Check if authentication was successful
      if (response.status === 200 || response.status === 201) {
        // Store authenticated user data in session storage
        sessionStorage.setItem("authUser", JSON.stringify(response.data.data));

        // Redirect user to dashboard
        history("/product");
      }

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
