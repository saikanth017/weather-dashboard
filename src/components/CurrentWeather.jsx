import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import sunny from "../assets/sunny.png";
import sunrise from "../assets/sunrise.png";
import sunset from "../assets/sunset.png";
import humidity from "../assets/humidity.png";
import pressure from "../assets/pressure.png";
import wind from "../assets/wind.png";
import uv from "../assets/uv.png";
import { useSelector } from "react-redux";
import { dataUpdate } from "../store/dataSlice";

function CurrentWeather({ cityName }) {
  const weatherData = useSelector((state) => state.data.value);

  const getCityName = () => {
    if (weatherData && weatherData.location) {
      return weatherData.location.name;
    }
    return "-----";
  };

  const getTime = () => {
    if (weatherData && weatherData.location) {
      return weatherData.location.localtime.split(" ")[1];
    }
    return "--:--";
  };

  const getDayAndDate = () => {
    if (weatherData && weatherData.location) {
      const dateObject = new Date(weatherData.location.localtime);
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayIndex = dateObject.getDay();
      const dayOfWeek = daysOfWeek[dayIndex];
      const formattedDate = `${dayOfWeek}, ${
        weatherData.location.localtime.split(" ")[0]
      }`;
      return formattedDate;
    }
    return "----------";
  };

  const getTemperature = () => {
    if (weatherData && weatherData.current) {
      return weatherData.current.temp_c;
    }
    return "--";
  };

  const getFeelslikeTemp = () => {
    if (weatherData && weatherData.current) {
      return weatherData.current.feelslike_c;
    }
    return "--";
  };

  const getSunriseTime = () => {
    if (weatherData && weatherData.forecast) {
      return weatherData.forecast.forecastday[0].astro.sunrise;
    }
    return "--:--";
  };

  const getSunsetTime = () => {
    if (weatherData && weatherData.forecast) {
      return weatherData.forecast.forecastday[0].astro.sunset;
    }
    return "--:--";
  };

  const getIconUrl = () => {
    if (weatherData && weatherData.current && weatherData.current.condition) {
      return weatherData.current.condition.icon;
    }
    return sunny;
  };

  const getWeatherCondition = () => {
    if (weatherData && weatherData.current && weatherData.current.condition) {
      return weatherData.current.condition.text;
    }
    return "-----";
  };

  const getHumidity = () => {
    if (weatherData && weatherData.current) {
      return weatherData.current.humidity;
    }
    return "--";
  };

  const getWindSpeed = () => {
    if (weatherData && weatherData.current) {
      return weatherData.current.wind_kph;
    }
    return "--";
  };

  const getPressure = () => {
    if (weatherData && weatherData.current) {
      return weatherData.current.pressure_mb;
    }
    return "---";
  };

  const getVisibilityData = () => {
    if (weatherData && weatherData.current) {
      return weatherData.current.vis_km;
    }
    return "---";
  };

  const getDayFromDate = (date) => {
    if (date) {
      const dateObject = new Date(date);
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayIndex = dateObject.getDay();
      const dayOfWeek = daysOfWeek[dayIndex];
      return dayOfWeek;
    }
  };

  const getMonthAndYear = (date) => {
    if (date) {
      const dateTimeString = date;
      const dateTime = new Date(dateTimeString);
      const month = new Intl.DateTimeFormat("en", { month: "short" }).format(
        dateTime
      );
      const day = dateTime.getDate();
      const formattedDate = `${month} ${day}`;
      return formattedDate;
    }
  };

  return (
    <Container maxWidth="lg">
      <div
        style={{
          marginTop: "100px",
        }}
      >
        <Grid container spacing={4} maxWidth="large">
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <Paper
              style={{
                background:
                  "linear-gradient(90deg, rgba(44,46,45,1) 0%, rgba(14,16,15,1) 91%)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid #252623",
                display: "flex",
                flexDirection: "column",
                color: "white",
                borderRadius: "24px",
                boxShadow: "10px 10px 8px rgba(10, 10, 10, 0.1)",
                padding: 16,
                minHeight: "280px",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ margin: "40px 0", fontSize: 28, fontWeight: 1000 }}
              >
                {getCityName()}
              </Typography>
              <Typography
                sx={{
                  fontSize: 50,
                  fontWeight: 1000,
                  margin: "0",
                  padding: 0,
                }}
              >
                {getTime()}
              </Typography>
              <Typography sx={{ margin: "-8px 0 40px 0" }}>
                {getDayAndDate()}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={9}>
            <Paper
              sx={{
                background:
                  "linear-gradient(90deg, rgba(44,46,45,1) 0%, rgba(14,16,15,1) 91%)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid #252623",
                backdropFilter: "blur(20px)",
                display: "flex",
                justifyContent: "space-evenly",
                color: "white",
                borderRadius: "24px",
                boxShadow: "10px 10px 8px rgba(10, 10, 10, 10.1)",
                padding: "16px 50px",
                minHeight: "285px",
                flexWrap: "wrap",
                gap: 5,
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "center",
                  justifyContent: "space-around",
                  minWidth: "30%",
                  // backgroundColor: "black",
                }}
              >
                <div>
                  <Typography sx={{ fontSize: 60, marginBottom: 0 }}>
                    {getTemperature()}°C
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
                    <Typography sx={{ fontSize: 20 }}>
                      {getFeelslikeTemp()}°C
                    </Typography>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={sunrise} style={{ height: 45 }}></img>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography>Sunrise</Typography>
                    <Typography>{getSunriseTime()}</Typography>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={sunset} style={{ height: 45 }}></img>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography>Sunset</Typography>
                    <Typography>{getSunsetTime()}</Typography>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                  minWidth: "30%",
                  // backgroundColor: "red",
                }}
              >
                <img src={getIconUrl()} style={{ height: 120 }}></img>
                <Typography style={{ fontSize: 28, textAlign: "center" }}>
                  {getWeatherCondition()}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  padding: 0,
                  gap: 10,
                  flex: 1,
                  width: "30%",
                  // backgroundColor: "blue",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    gap: 40,
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
                    <Typography>{getHumidity()}%</Typography>
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
                    <Typography>{getPressure()} mb</Typography>
                    <Typography>Pressure</Typography>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    gap: 40,
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
                    <Typography>{getWindSpeed()} km/h</Typography>
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
                    <Typography>{getVisibilityData()} km</Typography>
                    <Typography>Visibility</Typography>
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={5}>
            <Paper
              style={{
                backgroundColor: "#161716",
                border: "1px solid #252623",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid #252623",
                WebkitBackdropFilter: "blur(20px)",
                backdropFilter: "blur(20px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                color: "white",
                borderRadius: "24px",
                boxShadow: "10px 10px 8px rgba(10, 10, 10, 10.1)",
                padding: 16,
                height: "373px",
                gap: 10,
              }}
            >
              <Typography
                sx={{ fontSize: 28, fontWeight: 700, margin: "0 auto" }}
              >
                5 Days Forecast
              </Typography>
              {weatherData &&
              weatherData.forecast &&
              weatherData.forecast.forecastday.length > 0
                ? weatherData.forecast.forecastday.map((data, index) => (
                    <div
                      key={index}
                      style={{
                        width: "90%",
                        height: "60px",
                        borderRadius: 12,
                        background:
                          "linear-gradient(90deg, rgba(44,46,45,1) 0%, rgba(14,16,15,1) 91%)",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "20%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography>{getDayFromDate(data.date)}</Typography>
                      </div>
                      <div
                        style={{
                          width: "28%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <div
                          style={{
                            width: "45%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            style={{ height: 30 }}
                            src={data.day.condition.icon}
                          ></img>
                        </div>
                        <div
                          style={{
                            width: "90%",
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                          }}
                        >
                          <Typography>{data.day.avgtemp_c}°C</Typography>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "40%",
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        <Typography>{data.day.condition.text}</Typography>
                      </div>
                    </div>
                  ))
                : [...Array(5)].map((_, index) => (
                    <div
                      style={{
                        width: "90%",
                        height: "60px",
                        borderRadius: 12,
                        background:
                          "linear-gradient(90deg, rgba(44,46,45,1) 0%, rgba(14,16,15,1) 91%)",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "20%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography>------</Typography>
                      </div>
                      <div
                        style={{
                          width: "20%",
                          display: "flex",
                          justifyContent: "center",
                          gap: 5,
                        }}
                      >
                        <img style={{ height: 20 }} src={sunny}></img>
                        <Typography>--°C</Typography>
                      </div>
                      <div
                        style={{
                          width: "50%",
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        <Typography>----------------</Typography>
                      </div>
                    </div>
                  ))}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={7}>
            <Paper
              style={{
                backgroundColor: "#161716",
                border: "1px solid #252623",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid #252623",
                WebkitBackdropFilter: "blur(20px)",
                backdropFilter: "blur(20px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                color: "white",
                borderRadius: "24px",
                boxShadow: "10px 10px 8px rgba(10, 10, 10, 10.1)",
                padding: 16,
                height: "373px",
                gap: 10,
              }}
            >
              <Typography
                sx={{ fontSize: 28, fontWeight: 700, margin: "0 auto" }}
              >
                Hourly Forecast
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                {weatherData &&
                weatherData.forecast &&
                weatherData.forecast.forecastday[0].hour.length > 0
                  ? weatherData.forecast.forecastday[0].hour.map(
                      (data, index) => {
                        if (index % 5 === 0) {
                          return (
                            <div
                              key={index}
                              style={{
                                width: "17%",
                                height: "90%",
                                borderRadius: 12,
                                background:
                                  "linear-gradient(90deg, rgba(44,46,45,1) 0%, rgba(14,16,15,1) 91%)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Typography sx={{ fontSize: 18 }}>
                                  {data.time.split(" ")[1]}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }}>
                                  {getMonthAndYear(data.time)}
                                </Typography>
                              </div>
                              <div>
                                <img
                                  style={{ height: 45 }}
                                  src={data.condition.icon}
                                  alt="Sunny"
                                ></img>
                              </div>
                              <div>
                                <Typography sx={{ fontSize: 14 }}>
                                  {data.temp_c}°C
                                </Typography>
                              </div>
                            </div>
                          );
                        } else {
                          return null;
                        }
                      }
                    )
                  : [...Array(6)].map((_, index) => (
                      <div
                        style={{
                          key: { index },
                          width: "15%",
                          height: "90%",
                          borderRadius: 12,
                          background:
                            "linear-gradient(90deg, rgba(44,46,45,1) 0%, rgba(14,16,15,1) 91%)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography sx={{ fontSize: 22 }}>--:--</Typography>
                          <Typography>-----</Typography>
                        </div>
                        <div>
                          <img
                            style={{ height: 40 }}
                            src={sunny}
                            alt="Sunny"
                          ></img>
                        </div>
                        <div>
                          <Typography sx={{ fontSize: 22 }}>--°C</Typography>
                        </div>
                      </div>
                    ))}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default CurrentWeather;
