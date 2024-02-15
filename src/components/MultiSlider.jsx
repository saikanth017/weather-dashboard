import { Container, Typography } from "@mui/material";
import React, { Component } from "react";
import "./slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function MultiSlider() {
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
        <div className="box">
          <h3>1</h3>
        </div>
        <div className="box">
          <h3>2</h3>
        </div>
        <div className="box">
          <h3>3</h3>
        </div>
        <div className="box">
          <h3>4</h3>
        </div>
        <div className="box">
          <h3>5</h3>
        </div>
        <div className="box">
          <h3>6</h3>
        </div>
        <div className="box">
          <h3>7</h3>
        </div>
        <div className="box">
          <h3>8</h3>
        </div>
        <div className="box">
          <h3>9</h3>
        </div>
        <div className="box">
          <h3>10</h3>
        </div>
      </Slider>
    </Container>
  );
}

export default MultiSlider;
