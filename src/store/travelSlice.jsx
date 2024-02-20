import { createSlice } from "@reduxjs/toolkit";

const travelSlice = createSlice({
  name: "travel",
  initialState: {
    value: {}, // Initialize value as an empty object
  },
  reducers: {
    travelUpdate: (state, action) => {
      const { date, data } = action.payload;
      // Update state.value to accumulate data for all dates
      state.value = {
        ...state.value, // Spread the existing state value
        [date]: data, // Update the data for the specified date
      };
    },
    resetTravel: (state, action) => {
      state.value = {};
    },
  },
});

export const { travelUpdate, resetTravel } = travelSlice.actions;
export default travelSlice.reducer;
