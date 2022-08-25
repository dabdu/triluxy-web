import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import hotelService from "./hotelService";
const initialState = {
  hotels: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
// Create New Hotel

export const createHotel = createAsyncThunk(
  "hotel/create",
  async (hotenData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await hotelService.createHotel(hotenData, token);
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
export const getHotel = createAsyncThunk(
  "hotel/getHotelByUser",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await hotelService.getHotel(token);
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
export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHotel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createHotel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.hotels = action.payload;
      })
      .addCase(createHotel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getHotel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHotel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.hotels = action.payload;
      })
      .addCase(getHotel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = hotelSlice.actions;
export default hotelSlice.reducer;
