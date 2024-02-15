import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    value: {},
  },
  reducers: {
    dataUpdate: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { dataUpdate } = dataSlice.actions;
export default dataSlice.reducer;
