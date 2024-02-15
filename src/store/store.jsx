import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import foreCastReducer from "./forecastSlice";
import hourlyCastReducer from "./hourlyForeCastSlice";
import travelReducer from "./travelSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
    foreCast: foreCastReducer,
    hourly: hourlyCastReducer,
    travel: travelReducer,
  },
});

export default store;
