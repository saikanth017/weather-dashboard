import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CurrentWeather from "./CurrentWeather";
import logo from "../assets/logo.png";
import search from "../assets/search.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataUpdate } from "../store/dataSlice";
import { fiveDaysForecasteUpdate } from "../store/forecastSlice";
import { hourlyUpdate } from "../store/hourlyForeCastSlice";
import { Link, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Farmer from "./Farmer";
import Traveller from "./Traveller";
import NotFound from "./NotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { futureData } from "../store/farmerSlice";

const logoStyle = {
  width: "120px",
  height: "auto",
  cursor: "pointer",
  margin: "18px",
  marginTop: "24px",
};

function Header({ mode }) {
  const dispatch = useDispatch();

  const [cityFound, setCityFound] = useState(true);

  const location = useLocation();
  const path = location.pathname;
  const page = path.substring(path.lastIndexOf("/") + 1);

  const [open, setOpen] = React.useState(false);
  const [cityName, setCityName] = useState("");

  const handleInputChange = (event) => {
    setCityName(event.target.value);
    console.log(event.target.value);
  };

  const [cName, setCName] = useState("");

  const handleCNameChange = (event) => {
    setCName(event.target.value);
    console.log(event.target.value);
  };

  const handleCNameSubmit = async () => {
    console.log("submit button clicked");
    var today = new Date();
    var dates = [];
    for (var i = 0; i < 15; i++) {
      var nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      dates.push(nextDate.toISOString().slice(0, 10));
    }
    for (const date of dates) {
      const currentWeatherAPI = `https://api.weatherapi.com/v1/forecast.json?key=dae601f9e86748748ec110640241202&q=${cName}&dt=${date}`;

      try {
        const response = await fetch(currentWeatherAPI);

        if (response.ok) {
          const json = await response.json();
          dispatch(futureData({ date: date, data: json }));
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

  // const weatherData = useSelector((state) => state.data.value);

  const handleSubmit = async (cName) => {
    if (cityName) {
      const currentWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=88950ebffe6ea2e470a6af895b42676b`;
      const forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=88950ebffe6ea2e470a6af895b42676b`;

      fetch(currentWeatherAPI)
        .then((response) => response.json())
        .then((json) => {
          dispatch(dataUpdate(json));
        });

      fetch(forecastAPI)
        .then((response) => response.json())
        .then((json) => {
          if (json.list && json.list.length > 0) {
            const filteredHourlyForecast = json.list.filter(
              (forecast, index) => {
                return index <= 5;
              }
            );
            dispatch(hourlyUpdate(filteredHourlyForecast));

            const filteredForecast = json.list.filter((forecast, index) => {
              return index % 8 === 0;
            });
            dispatch(fiveDaysForecasteUpdate(filteredForecast));
          } else {
            toast.error("Error: Forecast data not available", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
            console.log("Error: Forecast data not available");
          }
        })
        .catch((error) => {
          console.error("Error fetching forecast data:", error);
        });

      setCityName("");
    }
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  const navigateToFarmer = () => {
    // Navigate to Farmer component
    return <Link to="/farmer">Traveller</Link>;
  };

  const navigateToTraveller = () => {
    // Navigate to Traveller component
    console.log("Travel button clicked");
    return <Link to="/traveller">Traveller</Link>;
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <Link to="/">
                <img src={logo} style={logoStyle} alt="logo of sitemark" />
              </Link>

              {page === "traveller" ? (
                <></>
              ) : page === "farmer" ? (
                <>
                  <input
                    value={cName}
                    onChange={handleCNameChange}
                    type="text"
                    placeholder="Enter city name..."
                    style={{
                      flex: 1,
                      marginRight: 28,
                      height: 40,
                      borderRadius: 20,
                      border: "none",
                      paddingLeft: 20,
                    }}
                  ></input>
                  <button
                    type="button"
                    onClick={handleCNameSubmit}
                    style={{
                      marginLeft: -60,
                      borderRadius: 20,
                      border: "none",
                      marginRight: 18,
                      backgroundColor: "none",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={search}
                      style={{ height: 20, width: 20, backgroundColor: "none" }}
                    ></img>
                  </button>
                </>
              ) : (
                <>
                  <input
                    value={cityName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Enter city name..."
                    style={{
                      flex: 1,
                      marginRight: 28,
                      height: 40,
                      borderRadius: 20,
                      border: "none",
                      paddingLeft: 20,
                    }}
                  ></input>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    style={{
                      marginLeft: -60,
                      borderRadius: 20,
                      border: "none",
                      marginRight: 18,
                      backgroundColor: "none",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={search}
                      style={{ height: 20, width: 20, backgroundColor: "none" }}
                    ></img>
                  </button>
                </>
              )}
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <Link to="/traveller">
                <Button
                  style={{ color: "black" }}
                  variant="text"
                  size="small"
                  component="a"
                >
                  Traveller
                </Button>
              </Link>

              <Link to="/farmer">
                <Button
                  style={{ color: "black" }}
                  variant="text"
                  size="small"
                  component="a"
                >
                  Farmer
                </Button>
              </Link>
            </Box>

            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  ></Box>
                  <Link to="/traveller" style={{ textDecoration: "none" }}>
                    <Button
                      style={{
                        color: "black",
                        display: "block",
                      }}
                      variant="text"
                      size="small"
                      component="a"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      Traveller
                    </Button>
                  </Link>
                  <Link to="/farmer" style={{ textDecoration: "none" }}>
                    <Button
                      style={{ color: "black", display: "block" }}
                      variant="text"
                      size="small"
                      component="a"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      Farmer
                    </Button>
                  </Link>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
        <ToastContainer></ToastContainer>
      </AppBar>
      {path === "/" && <CurrentWeather></CurrentWeather>}
      {path === "/traveller" && <Traveller></Traveller>}
      {path === "/farmer" && <Farmer></Farmer>}
      {path !== "/" && path !== "/traveller" && path !== "/farmer" && (
        <NotFound></NotFound>
      )}
    </div>
  );
}

// Header.propTypes = {
//   mode: PropTypes.oneOf(["dark", "light"]).isRequired,
//   toggleColorMode: PropTypes.func.isRequired,
// };

export default Header;
