import { createSlice } from "@reduxjs/toolkit";

const foreCastSlice = createSlice({
  name: "foreCast",
  initialState: {
    value: {},
  },
  reducers: {
    fiveDaysForecasteUpdate: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { fiveDaysForecasteUpdate } = foreCastSlice.actions;
export default foreCastSlice.reducer;
