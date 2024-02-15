// Traveller.js
import React, { useState } from "react";
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

function Traveller() {
  const [selectedDates, setSelectedDates] = useState(null);

  const handleGetSelectedDates = (dates) => {
    setSelectedDates(dates);
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
        <DateRangePicker handleGetSelectedDates={handleGetSelectedDates} />
        <Grid container sx={{ marginTop: "0px" }} spacing={4} maxWidth="large">
          <Grid item xs={12} sm={12} md={4} lg={3}>
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
                minHeight: "250px",
                maxHeight: "250px",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ margin: "40px 0", fontSize: 28, fontWeight: 1000 }}
              >
                Hyderabad
              </Typography>
              {selectedDates ? (
                <>
                  <Typography sx={{ margin: "-8px 0 40px 0" }}>
                    Start Date:{" "}
                    {selectedDates.startDate.toISOString().substring(0, 10)}
                  </Typography>
                  <Typography sx={{ margin: "-8px 0 40px 0" }}>
                    End Date:{" "}
                    {selectedDates.endDate.toISOString().substring(0, 10)}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography sx={{ margin: "-8px 0 40px 0" }}>
                    From : 15-02-2024
                  </Typography>
                  <Typography sx={{ margin: "-8px 0 40px 0" }}>
                    To : 15-02-2024
                  </Typography>
                </>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={9}>
            <Paper
              style={{
                // backgroundColor: "rgba(68, 68, 68, 0.5)", // Adjust the alpha value as needed
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                WebkitBackdropFilter: "blur(20px)",
                backdropFilter: "blur(20px)",
                display: "flex",
                justifyContent: "space-evenly",
                color: "white",
                borderRadius: "24px",
                boxShadow: "10px 10px 8px rgba(10, 10, 10, 10.1)",
                padding: "16px 50px",
                minHeight: "250px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "stretch",
                  justifyContent: "space-around",
                }}
              >
                <div>
                  <Typography sx={{ fontSize: 60, marginBottom: 0 }}>
                    26°C
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginTop: -20,
                    }}
                  >
                    <Typography sx={{ padding: 0 }}>Feels like :</Typography>
                    <Typography sx={{ fontSize: 20 }}>28°C</Typography>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={sunrise} style={{ height: 45 }}></img>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography>Sunrise</Typography>
                    <Typography>6:17 AM</Typography>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={sunset} style={{ height: 45 }}></img>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography>Sunset</Typography>
                    <Typography>6:17 AM</Typography>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <img src={sunny} style={{ height: 120 }}></img>
                <Typography>Sunny</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img src={humidity} style={{ height: 45, width: 45 }}></img>
                  <Typography>17 %</Typography>
                  <Typography>Humididty</Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img src={pressure} style={{ height: 45, width: 45 }}></img>
                  <Typography>1017 mb</Typography>
                  <Typography>Pressure</Typography>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img src={wind} style={{ height: 45, width: 45 }}></img>
                  <Typography>10 km/h</Typography>
                  <Typography>Wind Speed</Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img src={uv} style={{ height: 45, width: 45 }}></img>
                  <Typography>7 km</Typography>
                  <Typography>Visibility</Typography>
                </div>
              </div>
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
                minHeight: "340px",
                gap: 1,
              }}
            >
              <MultiSlider></MultiSlider>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Traveller;
