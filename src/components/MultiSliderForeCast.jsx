import { Container, Typography } from "@mui/material";
import React, { Component, useEffect } from "react";
import "./sliderForeCast.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import sunrise from "../assets/sunrise.png";
import sunset from "../assets/sunset.png";
import rain from "../assets/rain.png";
import { Scale } from "@mui/icons-material";

function MultiSliderForeCast({ id }) {
  const travelData = useSelector((state) => state.travel.value);
  const futureData = useSelector((state) => state.farmer.value.fData);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 630,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Container maxWidth="lg" className="carousel">
      <Slider {...settings}>
        {id !== "futureData"
          ? Object.keys(travelData).length > 0
            ? Object.keys(travelData).map((date) => (
                <div
                  className="slider-forecast-box"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: 0,
                    minHeight: 200,
                    alignItems: "stretch",
                  }}
                >
                  <h3 style={{ fontSize: 14, margin: "20px auto 1px auto" }}>
                    {date}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: 35, marginTop: 1.5 }}>
                      {travelData[date].forecast.forecastday[0].day.maxtemp_c}°C
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginRight: 0,
                      }}
                    >
                      <img style={{ height: 45 }} src={rain}></img>
                      <Typography>Rainfall(%)</Typography>
                      <Typography>
                        {
                          travelData[date].forecast.forecastday[0].day
                            .daily_chance_of_rain
                        }
                        %
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      minHeight: "20px",
                      margin: 0,
                      marginTop: 16,
                    }}
                  >
                    <div>
                      <Typography sx={{ fontSize: 10 }}>
                        Sun Rise :{" "}
                        {travelData[date].forecast.forecastday[0].astro.sunrise}
                      </Typography>
                      <Typography sx={{ fontSize: 10 }}>
                        Sun Set :{" "}
                        {travelData[date].forecast.forecastday[0].astro.sunset}
                      </Typography>
                    </div>
                    <div
                      style={{
                        height: "35px",
                        borderLeft: "1px solid white",
                        margin: 0,
                      }}
                    ></div>

                    <div>
                      <Typography sx={{ fontSize: 10 }}>
                        Humidity :
                        {
                          travelData[date].forecast.forecastday[0].hour[0]
                            .humidity
                        }{" "}
                        %
                      </Typography>
                      <Typography sx={{ fontSize: 10 }}>
                        Wind :
                        {
                          travelData[date].forecast.forecastday[0].hour[0]
                            .wind_kph
                        }
                        km/h
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      minHeight: "20px",
                      margin: "15px auto",
                    }}
                  >
                    <img
                      style={{ height: 50 }}
                      src={
                        travelData[date].forecast.forecastday[0].day[
                          "condition"
                        ].icon
                      }
                    ></img>
                    <div>
                      <Typography>
                        {
                          travelData[date].forecast.forecastday[0].day[
                            "condition"
                          ].text
                        }
                      </Typography>
                    </div>
                  </div>
                </div>
              ))
            : [...Array(8)].map((_, index) => (
                <div
                  className="slider-forecast-box"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: 0,
                    minHeight: 200,
                    alignItems: "stretch",
                  }}
                >
                  <h3 style={{ fontSize: 14, margin: "20px auto 1px auto" }}>
                    --/--/--
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: 35, marginTop: 1.5 }}>
                      --°C
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginRight: 0,
                      }}
                    >
                      <img style={{ height: 45 }} src={rain}></img>
                      <Typography>Rainfall(%)</Typography>
                      <Typography>--%</Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      minHeight: "20px",
                      margin: 0,
                      marginTop: 16,
                    }}
                  >
                    <div>
                      <Typography sx={{ fontSize: 10 }}>
                        Sun Rise : --:--
                      </Typography>
                      <Typography sx={{ fontSize: 10 }}>
                        Sun Set : --:--
                      </Typography>
                    </div>
                    <div
                      style={{
                        height: "35px",
                        borderLeft: "1px solid white",
                        margin: 0,
                      }}
                    ></div>

                    <div>
                      <Typography sx={{ fontSize: 10 }}>
                        Humidity : --%
                      </Typography>
                      <Typography sx={{ fontSize: 10 }}>
                        Wind : --km/h
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      minHeight: "20px",
                      margin: "15px auto",
                    }}
                  >
                    <img style={{ height: 50 }} src={rain}></img>
                    <div>
                      <Typography>-----------</Typography>
                    </div>
                  </div>
                </div>
              ))
          : Object.keys(futureData).length > 0
          ? Object.keys(futureData).map((date) => (
              <div
                className="slider-forecast-box"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  margin: 0,
                  minHeight: 200,
                  alignItems: "stretch",
                }}
              >
                <h3 style={{ fontSize: 14, margin: "20px auto 1px auto" }}>
                  {date}
                </h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography sx={{ fontSize: 35, marginTop: 1.5 }}>
                    {futureData[date].forecast.forecastday[0].day.maxtemp_c}°C
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginRight: 0,
                    }}
                  >
                    <img style={{ height: 45 }} src={rain}></img>
                    <Typography>Rainfall(%)</Typography>
                    <Typography>
                      {
                        futureData[date].forecast.forecastday[0].day
                          .daily_chance_of_rain
                      }
                      %
                    </Typography>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    minHeight: "20px",
                    margin: 0,
                    marginTop: 16,
                  }}
                >
                  <div>
                    <Typography sx={{ fontSize: 10 }}>
                      Sun Rise :{" "}
                      {futureData[date].forecast.forecastday[0].astro.sunrise}
                    </Typography>
                    <Typography sx={{ fontSize: 10 }}>
                      Sun Set :{" "}
                      {futureData[date].forecast.forecastday[0].astro.sunset}
                    </Typography>
                  </div>
                  <div
                    style={{
                      height: "35px",
                      borderLeft: "1px solid white",
                      margin: 0,
                    }}
                  ></div>

                  <div>
                    <Typography sx={{ fontSize: 10 }}>
                      Humidity :
                      {
                        futureData[date].forecast.forecastday[0].hour[0]
                          .humidity
                      }{" "}
                      %
                    </Typography>
                    <Typography sx={{ fontSize: 10 }}>
                      Wind :
                      {
                        futureData[date].forecast.forecastday[0].hour[0]
                          .wind_kph
                      }
                      km/h
                    </Typography>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    minHeight: "20px",
                    margin: "15px auto",
                  }}
                >
                  <img
                    style={{ height: 50 }}
                    src={
                      futureData[date].forecast.forecastday[0].day["condition"]
                        .icon
                    }
                  ></img>
                  <div>
                    <Typography>
                      {
                        futureData[date].forecast.forecastday[0].day[
                          "condition"
                        ].text
                      }
                    </Typography>
                  </div>
                </div>
              </div>
            ))
          : [...Array(8)].map((_, index) => (
              <div
                className="slider-forecast-box"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  margin: 0,
                  minHeight: 200,
                  alignItems: "stretch",
                }}
              >
                <h3 style={{ fontSize: 14, margin: "20px auto 1px auto" }}>
                  --/--/--
                </h3>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography sx={{ fontSize: 35, marginTop: 1.5 }}>
                    --°C
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginRight: 0,
                    }}
                  >
                    <img style={{ height: 45 }} src={rain}></img>
                    <Typography>Rainfall(%)</Typography>
                    <Typography>--%</Typography>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    minHeight: "20px",
                    margin: 0,
                    marginTop: 16,
                  }}
                >
                  <div>
                    <Typography sx={{ fontSize: 10 }}>
                      Sun Rise : --:--
                    </Typography>
                    <Typography sx={{ fontSize: 10 }}>
                      Sun Set : --:--
                    </Typography>
                  </div>
                  <div
                    style={{
                      height: "35px",
                      borderLeft: "1px solid white",
                      margin: 0,
                    }}
                  ></div>

                  <div>
                    <Typography sx={{ fontSize: 10 }}>
                      Humidity : --%
                    </Typography>
                    <Typography sx={{ fontSize: 10 }}>Wind : --km/h</Typography>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    minHeight: "20px",
                    margin: "15px auto",
                  }}
                >
                  <img style={{ height: 50 }} src={rain}></img>
                  <div>
                    <Typography>-----------</Typography>
                  </div>
                </div>
              </div>
            ))}
      </Slider>
    </Container>
  );
}

export default MultiSliderForeCast;
