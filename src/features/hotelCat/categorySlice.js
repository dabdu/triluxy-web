import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";
const initialState = {
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
// Create New Hotel Category

export const createCategory = createAsyncThunk(
  "category/create",
  async (categoryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await categoryService.createCategory(categoryData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Get Indivdual Hotel
export const getCategories = createAsyncThunk(
  "category/getAllCategory",
  async (hotel_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await categoryService.getCategories(hotel_id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.hotels = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
