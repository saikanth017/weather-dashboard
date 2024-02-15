import { createSlice } from "@reduxjs/toolkit";

const hourlyCastSlice = createSlice({
  name: "hourly",
  initialState: {
    value: {},
  },
  reducers: {
    hourlyUpdate: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { hourlyUpdate } = hourlyCastSlice.actions;
export default hourlyCastSlice.reducer;
