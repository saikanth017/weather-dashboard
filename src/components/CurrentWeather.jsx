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

function CurrentWeather({ cityName }) {
  const weatherData = useSelector((state) => state.data.value);
  const foreCastData = useSelector((state) => state.foreCast.value);
  const hourlyForeCastData = useSelector((state) => state.hourly.value);

  function getHourlyTime(time) {
    if (hourlyForeCastData.length > 0) {
      var dateTimeString = time;
      var dateTime = new Date(dateTimeString);
      var hours = dateTime.getHours();
      var minutes = dateTime.getMinutes();
      var time = hours + ":" + (minutes < 10 ? "0" : "") + minutes; // Add leading zero if minutes is less than 10
      return time;
    }
    return "----";
  }

  const name = weatherData?.name ? weatherData?.name : "-----";
  const country = weatherData?.sys?.country
    ? weatherData?.sys?.country
    : "-----";

  const temp = weatherData?.main?.temp
    ? Math.floor(weatherData?.main?.temp - 273)
    : "-----";
  const feelsLike = weatherData?.main?.feels_like
    ? Math.floor(weatherData?.main?.feels_like - 273)
    : "-----";

  const sunriseTime = weatherData?.sys?.sunrise
    ? new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--";

  const sunsetTime = weatherData?.sys?.sunset
    ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--:--";

  const humidityData = weatherData?.main?.humidity
    ? weatherData?.main?.humidity
    : "-----";

  const pressureData = weatherData?.main?.pressure
    ? weatherData?.main?.pressure
    : "-----";

  const windspeedData = weatherData?.wind?.speed
    ? weatherData?.wind?.speed
    : "-----";

  const visibilityData = weatherData?.visibility
    ? weatherData?.visibility / 1000
    : "-----";

  // Define mapping of weather conditions to corresponding icons
  const weatherIcons = {
    Clear: clearIcon,
    Clouds: cloudsIcon,
    Drizzle: drizzleIcon,
    Mist: mistIcon,
    Rain: rainIcon,
    Snow: snowIcon,
    Haze: hazeIcon,
  };

  let iconUrl = ""; // Default value for the icon URL
  let weatherCondition = "";

  if (
    weatherData &&
    weatherData.weather &&
    weatherData.weather.length > 0 &&
    weatherData.weather[0].main in weatherIcons
  ) {
    weatherCondition = weatherData.weather[0].main;
    iconUrl = weatherIcons[weatherCondition];
  }

  let forecasts = []; // Initialize array to store forecast data

  if (foreCastData && foreCastData.length > 0) {
    forecasts = foreCastData
      .map((item) => {
        if (
          item.weather &&
          item.weather.length > 0 &&
          item.weather[0].main in weatherIcons
        ) {
          return {
            foreCastUrl: weatherIcons[item.weather[0].main], // Icon URL
            foreCastCondition: item.weather[0].main, // Weather condition
            foreCastTemperature: Math.floor(item.main.temp - 273), // Replace with actual temperature data
            foreCastDaytdate: item.dt_txt, // Replace with actual date data
          };
        }
      })
      .filter(Boolean); // Remove any undefined entries
  }

  let hourlyForecasts = []; // Initialize array to store forecast data

  if (hourlyForeCastData && hourlyForeCastData.length > 0) {
    hourlyForecasts = hourlyForeCastData
      .map((item) => {
        if (
          item.weather &&
          item.weather.length > 0 &&
          item.weather[0].main in weatherIcons
        ) {
          return {
            hourlyForeCastUrl: weatherIcons[item.weather[0].main], // Icon URL
            hourlyForeCastCondition: item.weather[0].main, // Weather condition
            hourlyForeCastTemperature: Math.floor(item.main.temp - 273), // Replace with actual temperature data
            hourlyForeCastDaytdate: getHourlyTime(item.dt_txt),
            hourlyForeCastWind: item.wind.speed,
          };
        }
      })
      .filter(Boolean); // Remove any undefined entries
  }

  const currentTimeTimestamp =
    typeof weatherData?.timezone === "number" ? weatherData?.timezone : 0; // Check if timezone is valid, otherwise default to 0

  const formattedTime =
    currentTimeTimestamp !== null ? formatTime(currentTimeTimestamp) : "-----"; // Format the time or display "-----" if timestamp is invalid

  function formatTime(timestamp) {
    // Convert timezone offset from seconds to hours
    const timezoneOffsetHours = timestamp / 3600;

    // Get the current UTC time in milliseconds
    const currentUTCTimeMillis = Date.now();

    // Calculate the offset time in milliseconds
    const offsetTimeMillis =
      currentUTCTimeMillis + timezoneOffsetHours * 3600 * 1000;

    // Create a Date object with the offset time
    const offsetDate = new Date(offsetTimeMillis);

    // Extract hours, minutes, and seconds from the offset time
    const hours = offsetDate.getUTCHours();
    const minutes = offsetDate.getUTCMinutes();
    const day = offsetDate.getUTCDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
    const date = offsetDate.getUTCDate();
    const month = offsetDate.getUTCMonth() + 1; // Month is zero-based, so we add 1
    const year = offsetDate.getUTCFullYear();

    // Format the time
    const formattedTime =
      ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);

    // Format the date
    const formattedDate = `${year}-${("0" + month).slice(-2)}-${(
      "0" + date
    ).slice(-2)}`;

    // Get the day name
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const formattedDay = daysOfWeek[day];

    return { time: formattedTime, date: formattedDate, day: formattedDay };
  }

  function findDay(time) {
    // Create a new Date object with the specified date
    var date = new Date(time);

    // Define an array of weekday names
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Extract the day of the week (0-6) from the Date object
    var dayIndex = date.getDay();

    // Get the corresponding day name from the array
    var dayName = days[dayIndex];

    // Format the date as 'YYYY-MM-DD, Day'
    var formattedDate = dayName + ", " + date.toISOString().split("T")[0];

    return formattedDate;
  }

  return (
    <Container maxWidth="lg">
      <div
        style={{
          marginTop: "100px",
        }}
      >
        <Grid container spacing={4} maxWidth="large">
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
                {name}
              </Typography>
              <Typography
                sx={{
                  fontSize: 50,
                  fontWeight: 1000,
                  margin: "0",
                  padding: 0,
                }}
              >
                {formattedTime.time}
              </Typography>
              <Typography sx={{ margin: "-8px 0 40px 0" }}>
                {formattedTime.day}
                {", "}
                {formattedTime.date}
              </Typography>
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
                    {temp}°C
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
                    <Typography sx={{ fontSize: 20 }}>{feelsLike}°C</Typography>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={sunrise} style={{ height: 45 }}></img>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography>Sunrise</Typography>
                    <Typography>{sunriseTime}</Typography>
                    {/* --- */}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={sunset} style={{ height: 45 }}></img>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography>Sunset</Typography>
                    <Typography>{sunsetTime}</Typography>
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
                <img src={iconUrl} style={{ height: 120 }}></img>
                <Typography>{weatherCondition}</Typography>
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
                  <Typography>{humidityData}%</Typography>
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
                  <Typography>{pressureData} mb</Typography>
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
                  <Typography>{windspeedData} km/h</Typography>
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
                  <Typography>{visibilityData} km</Typography>
                  <Typography>Visibility</Typography>
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={5}>
            <Paper
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                WebkitBackdropFilter: "blur(20px)",
                backdropFilter: "blur(20px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",

                color: "white",
                borderRadius: "24px",
                boxShadow: "10px 10px 8px rgba(10, 10, 10, 10.1)",
                padding: 16,
                minHeight: "340px",
              }}
            >
              <Typography
                sx={{ fontSize: 28, fontWeight: 700, margin: "0 auto" }}
              >
                5 Days Forecast
              </Typography>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {forecasts.length > 0 ? (
                  forecasts.map((forecast, index) => (
                    <>
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        <img
                          src={forecast.foreCastUrl}
                          style={{ height: 40 }}
                        ></img>
                        <Typography>{forecast.foreCastCondition}</Typography>
                        <Typography>
                          {forecast.foreCastTemperature}°C
                        </Typography>
                        <Typography>
                          {findDay(forecast.foreCastDaytdate)}
                        </Typography>
                      </div>

                      {index < forecasts.length - 1 ? (
                        <Divider sx={{ margin: 0 }} />
                      ) : (
                        ""
                      )}
                    </>
                  ))
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <Typography>---</Typography>
                      <Typography>--°C</Typography>
                      <Typography>-------</Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <Typography>---</Typography>
                      <Typography>--°C</Typography>
                      <Typography>-------</Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <Typography>---</Typography>
                      <Typography>--°C</Typography>
                      <Typography>-------</Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <Typography>---</Typography>
                      <Typography>--°C</Typography>
                      <Typography>-------</Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <Typography>---</Typography>
                      <Typography>--°C</Typography>
                      <Typography>-------</Typography>
                    </div>
                  </>
                )}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={7}>
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
                padding: "16px 40px",
                minHeight: "340px",
                gap: 1,
              }}
            >
              {hourlyForecasts.length > 0 ? (
                hourlyForecasts.map((forecast, index) => (
                  <div
                    key={index} // Adding a unique key for each element in the list
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      WebkitBackdropFilter: "blur(20px)",
                      backdropFilter: "blur(20px)",
                      borderRadius: "24px",
                      padding: 10,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Typography>{forecast.hourlyForeCastDaytdate}</Typography>{" "}
                    <div>
                      <img
                        src={forecast.hourlyForeCastUrl}
                        style={{ height: 40 }}
                        alt="Sunny icon"
                      ></img>{" "}
                      <Typography>
                        {forecast.hourlyForeCastTemperature}°C
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={windspeed}
                        style={{ height: 40 }}
                        alt="Wind speed icon"
                      ></img>

                      <Typography>
                        {forecast.hourlyForeCastWind} km/h
                      </Typography>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      WebkitBackdropFilter: "blur(20px)",
                      backdropFilter: "blur(20px)",
                      borderRadius: "24px",
                      padding: 10,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <Typography>---</Typography>{" "}
                    <div>
                      {/* Added alt attribute */}
                      <Typography>-- °C</Typography>
                    </div>
                    <div>
                      <Typography>-- km/h</Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      WebkitBackdropFilter: "blur(20px)",
                      backdropFilter: "blur(20px)",
                      borderRadius: "24px",
                      padding: 10,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <Typography>---</Typography>{" "}
                    <div>
                      {/* Added alt attribute */}
                      <Typography>-- °C</Typography>
                    </div>
                    <div>
                      <Typography>-- km/h</Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      WebkitBackdropFilter: "blur(20px)",
                      backdropFilter: "blur(20px)",
                      borderRadius: "24px",
                      padding: 10,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <Typography>---</Typography>{" "}
                    <div>
                      {/* Added alt attribute */}
                      <Typography>-- °C</Typography>
                    </div>
                    <div>
                      <Typography>-- km/h</Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      WebkitBackdropFilter: "blur(20px)",
                      backdropFilter: "blur(20px)",
                      borderRadius: "24px",
                      padding: 10,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <Typography>---</Typography>{" "}
                    <div>
                      {/* Added alt attribute */}
                      <Typography>-- °C</Typography>
                    </div>
                    <div>
                      <Typography>-- km/h</Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      WebkitBackdropFilter: "blur(20px)",
                      backdropFilter: "blur(20px)",
                      borderRadius: "24px",
                      padding: 10,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <Typography>---</Typography>{" "}
                    <div>
                      {/* Added alt attribute */}
                      <Typography>-- °C</Typography>
                    </div>
                    <div>
                      <Typography>-- km/h</Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      WebkitBackdropFilter: "blur(20px)",
                      backdropFilter: "blur(20px)",
                      borderRadius: "24px",
                      padding: 10,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <Typography>---</Typography>{" "}
                    <div>
                      {/* Added alt attribute */}
                      <Typography>-- °C</Typography>
                    </div>
                    <div>
                      <Typography>-- km/h</Typography>
                    </div>
                  </div>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default CurrentWeather;
