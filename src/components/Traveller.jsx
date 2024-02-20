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

function Traveller() {
  const dispatch = useDispatch();
  const travelData = useSelector((state) => state.travel.value);

  const [selectedDates, setSelectedDates] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [travelCityName, setTravelCityName] = useState(null);

  const [cityFound, setCityFound] = useState(true);

  function formatDate(d) {
    const startDateString = d;

    // Create a new Date object from the provided string
    const startDate = new Date(startDateString);

    // Extract year, month, and date components
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0"); // Month starts from 0, so add 1
    const date = String(startDate.getDate()).padStart(2, "0");

    // Form the desired date string
    const desiredDateString = `${year}-${month}-${date}`;

    return desiredDateString;
  }

  useEffect(() => {
    if (startDate && endDate && travelCityName) {
      handleSubmit(travelCityName, startDate, endDate);
    }
  }, [startDate, endDate, travelCityName]);

  const handleGetSelectedDates = (dates) => {
    console.log(dates);
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
    setTravelCityName(dates.travelCityName);
  };

  function getDatesBetween(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate); // Initialize with the start date

    while (currentDate <= endDate) {
      // Push the current date to the array
      dates.push(new Date(currentDate));
      // Move to the next day by adding 1 to the date
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  const handleSubmit = async (travelCityName, startDate, endDate) => {
    // Adjust start and end dates to UTC
    const adjustedStartDate = new Date(
      startDate.getTime() - startDate.getTimezoneOffset() * 60000
    );
    const adjustedEndDate = new Date(
      endDate.getTime() - endDate.getTimezoneOffset() * 60000
    );

    // Get dates between adjusted start and end dates
    const datesBetween = getDatesBetween(adjustedStartDate, adjustedEndDate);

    // Loop through each date and fetch data
    for (const date of datesBetween) {
      const currentWeatherAPI = `https://api.weatherapi.com/v1/forecast.json?key=dae601f9e86748748ec110640241202&q=${travelCityName}&dt=${
        date.toISOString().split("T")[0]
      }`;

      try {
        const response = await fetch(currentWeatherAPI);

        if (response.ok) {
          const json = await response.json();
          // Dispatch data for this specific date
          dispatch(
            travelUpdate({ date: date.toISOString().split("T")[0], data: json })
          );
        } else {
          console.error(
            toast.error("Error : Location not found", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            })
          );
          setCityFound(false);
          break;
        }
      } catch (error) {
        console.error(
          toast.error("Error : Location not found", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          })
        );
        setCityFound(false);
        break;
      }
    }
  };

  const getCityName = () => {
    if (travelData) {
      const keys = Object.keys(travelData);
      return travelData[keys[0]]?.location?.name;
    } else {
      return "-------";
    }
  };

  // const getStartDate = () => {
  //   if (travelData && startDate) {
  //     return startDate.toISOString().substring(0, 10);
  //   } else {
  //     return "--------";
  //   }
  // };

  // const getEndDate = () => {
  //   if (travelData && endDate) {
  //     return endDate.toISOString().substring(0, 10);
  //   } else {
  //     return "-------";
  //   }
  // };
  // const getStartDate = () => {
  //   if (travelData && startDate) {
  //     // Adjust the date to UTC before converting to ISO string
  //     const adjustedStartDate = new Date(
  //       startDate.getTime() - startDate.getTimezoneOffset() * 60000
  //     );
  //     return adjustedStartDate.toISOString().substring(0, 10);
  //   } else {
  //     return "--------";
  //   }
  // };

  const getStartDate = () => {
    if (travelData) {
      const keys = Object.keys(travelData);
      return keys[0];
    } else {
      return "-------";
    }
  };
  const getEndDate = () => {
    if (travelData) {
      const keys = Object.keys(travelData);
      return keys[keys.length - 1];
    } else {
      return "-------";
    }
  };

  // const getEndDate = () => {
  //   if (travelData && endDate) {
  //     // Adjust the date to UTC before converting to ISO string
  //     const adjustedEndDate = new Date(
  //       endDate.getTime() - endDate.getTimezoneOffset() * 60000
  //     );
  //     return adjustedEndDate.toISOString().substring(0, 10);
  //   } else {
  //     return "-------";
  //   }
  // };

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
              {/* <MultiSlider></MultiSlider> */}
              <MultiSliderForeCast></MultiSliderForeCast>
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
                height: "250px",
                gap: 1,
              }}
            >
              <MultiSlider></MultiSlider>
            </Paper>
          </Grid>
        </Grid>

        {/* <>
          <div>
            <pre style={{ color: "white" }}>
              {JSON.stringify(travelData, null, 2)}
            </pre>
          </div>
        </> */}
      </Container>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default Traveller;
