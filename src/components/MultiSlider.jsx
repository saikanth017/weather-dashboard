import { Container, Typography } from "@mui/material";
import React from "react";
import "./slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import rain from "../assets/rain.png";
import { useSelector } from "react-redux";

function MultiSlider() {
  const travelData = useSelector((state) => state.travel.value);

  function getDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short" };
    return date.toLocaleDateString("en-US", options);
  }

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
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
        {Object.keys(travelData).length > 0
          ? Object.keys(travelData).map((date, index) =>
              travelData[date].forecast.forecastday[0].hour.map(
                (hourData, hourIndex) => (
                  <div
                    className="slider-box"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid white",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      height: 100,
                      margin: "auto",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        margin: "auto",
                        gap: 18,
                        marginTop: 10,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <h3>{hourData.time.split(" ")[1]}</h3>
                        <Typography>{getDate(hourData.time)}</Typography>
                      </div>

                      <img
                        style={{ height: 60 }}
                        src={hourData.condition.icon}
                        alt="Rainy weather"
                      />
                      <h3>{hourData.temp_c}°C</h3>
                    </div>
                  </div>
                )
              )
            )
          : [...Array(8)].map((_, index) => (
              <div
                className="slider-box"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  height: 100,
                  margin: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    margin: "auto",
                    gap: 18,
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <h3>---</h3>
                    <Typography>-- ---</Typography>
                  </div>

                  <img style={{ height: 60 }} src={rain} alt="Rainy weather" />

                  <h3>--°C</h3>
                </div>
              </div>
            ))}
      </Slider>
    </Container>
  );
}

export default MultiSlider;
