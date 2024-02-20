import { createSlice } from "@reduxjs/toolkit";

const farmerSlice = createSlice({
  name: "farmer",
  initialState: {
    value: {
      fData: {},
      pData: {},
    },
  },
  reducers: {
    futureData: (state, action) => {
      const { date, data } = action.payload;
      // Update state.value to accumulate data for all dates
      state.value.fData = {
        ...state.value.fData, // Spread the existing state value
        [date]: data, // Update the data for the specified date
      };
    },
    pastData: (state, action) => {
      const { date, data } = action.payload;
      // Update state.value to accumulate data for all dates
      state.value.pData = {
        ...state.value.pData, // Spread the existing state value
        [date]: data, // Update the data for the specified date
      };
    },
    reset: (state, action) => {
      state.value = {};
    },
  },
});

export const { futureData, pastData, reset } = farmerSlice.actions;
export default farmerSlice.reducer;
