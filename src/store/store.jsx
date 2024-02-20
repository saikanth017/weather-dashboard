import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import foreCastReducer from "./forecastSlice";
import hourlyCastReducer from "./hourlyForeCastSlice";
import travelReducer from "./travelSlice";
import farmerReducer from "./farmerSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
    foreCast: foreCastReducer,
    hourly: hourlyCastReducer,
    travel: travelReducer,
    farmer: farmerReducer,
  },
});

export default store;
