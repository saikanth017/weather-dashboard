import { createSlice } from "@reduxjs/toolkit";

const travelSlice = createSlice({
  name: "travel",
  initialState: {
    value: {},
  },
  reducers: {
    travelUpdate: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { travelUpdate } = travelSlice.actions;
export default travelSlice.reducer;
