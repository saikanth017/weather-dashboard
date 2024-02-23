import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { resetTravel } from "../store/travelSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 0;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const StyledInput = styled.input`
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  min-width: 100px;
  flex: 1;

  @media (min-width: 480px) {
    width: auto;
  }
`;

const DateRangePicker = ({ handleGetSelectedDates }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [travelCityName, setTravelCityName] = useState("");

  const handleTravelInputChange = (event) => {
    setTravelCityName(event.target.value);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleStartDateChange = (date) => {
    date.setHours(0, 0, 0, 0);
    setStartDate(date);
    if (endDate && date >= endDate) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    date.setHours(23, 59, 59, 999);
    setEndDate(date);
  };

  const handleGetDates = () => {
    if (startDate && endDate && travelCityName) {
      dispatch(resetTravel());
      handleGetSelectedDates({ startDate, endDate, travelCityName });
    } else {
      toast.warn("Enter All fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    setStartDate(null);
    setEndDate(null);
    setTravelCityName("");
  };

  const maxSelectableDate = new Date(
    today.getTime() + 15 * 24 * 60 * 60 * 1000
  );

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
    : today;

  return (
    <DatePickerContainer>
      <input
        value={travelCityName}
        onChange={handleTravelInputChange}
        type="text"
        placeholder="Enter city name..."
        style={{
          padding: 8,
          border: "1px solid #ccc",
          fontSize: 16,
          minWidth: "215px",
          borderRadius: 5,
        }}
      />
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={today}
        maxDate={maxSelectableDate}
        placeholderText="Start Date"
        customInput={<StyledInput />}
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={minEndDate}
        maxDate={maxSelectableDate}
        placeholderText="End Date"
        customInput={<StyledInput />}
      />
      <button
        onClick={handleGetDates}
        style={{ minWidth: "215px", borderRadius: 5, fontSize: 16 }}
      >
        Get Selected Dates
      </button>
    </DatePickerContainer>
  );
};

export default DateRangePicker;
