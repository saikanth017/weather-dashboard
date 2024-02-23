import React, { useState, useEffect } from "react";
import DateRangePicker from "./DateRangePicker";
import { Container, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import MultiSlider from "./MultiSlider";
import { useDispatch, useSelector } from "react-redux";
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

    const startDate = new Date(startDateString);

    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0");
    const date = String(startDate.getDate()).padStart(2, "0");
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
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  const handleSubmit = async (travelCityName, startDate, endDate) => {
    const adjustedStartDate = new Date(
      startDate.getTime() - startDate.getTimezoneOffset() * 60000
    );
    const adjustedEndDate = new Date(
      endDate.getTime() - endDate.getTimezoneOffset() * 60000
    );

    const datesBetween = getDatesBetween(adjustedStartDate, adjustedEndDate);

    for (const date of datesBetween) {
      const currentWeatherAPI = `https://api.weatherapi.com/v1/forecast.json?key=dae601f9e86748748ec110640241202&q=${travelCityName}&dt=${
        date.toISOString().split("T")[0]
      }`;

      try {
        const response = await fetch(currentWeatherAPI);

        if (response.ok) {
          const json = await response.json();
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
                background:
                  "linear-gradient(90deg, rgba(44,46,45,1) 0%, rgba(14,16,15,1) 91%)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid #252623",
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
                backgroundColor: "#161716",
                border: "1px solid #252623",
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
              <MultiSliderForeCast></MultiSliderForeCast>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Paper
              style={{
                backgroundColor: "#161716",
                border: "1px solid #252623",
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
      </Container>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default Traveller;
