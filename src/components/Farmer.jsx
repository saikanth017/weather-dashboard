// Traveller.js
import React, { useState, useEffect } from "react";
import DateRangePicker from "./DateRangePicker";
import { Container, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import MultiSlider from "./MultiSlider";
import Box from "@mui/material/Box";
import sunny from "../assets/sunny.png";
import sunrise from "../assets/sunrise.png";
import sunset from "../assets/sunset.png";
import humidity from "../assets/humidity.png";
import pressure from "../assets/pressure.png";
import wind from "../assets/wind.png";
import uv from "../assets/uv.png";
import windspeed from "../assets/windspeed.png";
import { useDispatch, useSelector } from "react-redux";
import { dataUpdate } from "../store/dataSlice";
import clearIcon from "../assets/clear.png";
import cloudsIcon from "../assets/clouds.png";
import drizzleIcon from "../assets/drizzle.png";
import mistIcon from "../assets/mist.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import hazeIcon from "../assets/haze.png";
import { fiveDaysForecasteUpdate } from "../store/forecastSlice";
import Divider from "@mui/material/Divider";
import { hourlyUpdate } from "../store/hourlyForeCastSlice";
import { travelUpdate } from "../store/travelSlice";
import MultiSliderForeCast from "./MultiSliderForeCast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

function Farmer() {
  const futureData = useSelector((state) => state.farmer.value.fData);

  const getCityName = () => {
    if (futureData) {
      const keys = Object.keys(futureData);
      return futureData[keys[0]]?.location?.name;
    } else {
      return "-------";
    }
  };

  const getStartDate = () => {
    if (futureData) {
      const keys = Object.keys(futureData);
      return keys[0];
    } else {
      return "-------";
    }
  };
  const getEndDate = () => {
    if (futureData) {
      const keys = Object.keys(futureData);
      return keys[keys.length - 1];
    } else {
      return "-------";
    }
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 0,
        }}
      >
        <Grid container sx={{ marginTop: "0px" }} spacing={4} maxWidth="large">
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Paper
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                WebkitBackdropFilter: "blur(20px)",
                backdropFilter: "blur(20px)",
                display: "flex",
                flexDirection: "column",
                color: "white",
                borderRadius: "24px",
                boxShadow: "10px 10px 8px rgba(10, 10, 10, 10.1)",
                padding: 16,
                minHeight: "310px",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ margin: "40px 0", fontSize: 28, fontWeight: 1000 }}
              >
                {getCityName()}
              </Typography>

              <Typography sx={{ margin: "-8px 0 40px 0" }}>
                Start Date : {getStartDate()}
              </Typography>
              <Typography sx={{ margin: "-8px 0 40px 0" }}>
                End Date : {getEndDate()}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <Paper
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                WebkitBackdropFilter: "blur(20px)",
                backdropFilter: "blur(20px)",
                display: "flex",
                justifyContent: "space-around",
                color: "white",
                borderRadius: "24px",
                boxShadow: "10px 10px 8px rgba(10, 10, 10, 10.1)",
                padding: "0px 10px",
                minHeight: "250px",
                gap: 1,
              }}
            >
              <MultiSliderForeCast id="futureData"></MultiSliderForeCast>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Paper
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                WebkitBackdropFilter: "blur(20px)",
                backdropFilter: "blur(20px)",
                display: "flex",
                justifyContent: "space-around",
                color: "white",
                borderRadius: "24px",
                boxShadow: "10px 10px 8px rgba(10, 10, 10, 10.1)",
                padding: "0px 10px",
                height: "320px",
                gap: 1,
              }}
            >
              {/* <Typography>Past 16 days Forecast</Typography> */}
              {/* <MultiSlider></MultiSlider> */}
              {/* <MultiSliderForeCast id="pastData"></MultiSliderForeCast> */}
            </Paper>
          </Grid>
        </Grid>

        <>
          <div>
            <pre style={{ color: "white" }}>
              {JSON.stringify(futureData, null, 2)}
            </pre>
          </div>
        </>
      </Container>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default Farmer;
