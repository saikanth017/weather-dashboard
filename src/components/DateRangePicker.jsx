import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  flex-wrap: wrap;
  //   min-height: 135px;
  margin-bottom: 0;
  //   flex: 2;

  @media (min-width: 480px) {
    flex-direction: row;
    // justify-content: space-between;
    justify-content: center;
  }
`;

const StyledInput = styled.input`
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  flex: 1;

  @media (min-width: 480px) {
    width: auto;
  }
`;

const StyledButton = styled.button`
  height: 40px;
  border: none;
  border-radius: 20px;
  padding: 0 20px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;

  @media (min-width: 480px) {
    margin-left: 10px;
    width: auto;
  }
`;

const DateRangePicker = ({ handleGetSelectedDates }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Calculate today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to start of the day

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleGetDates = () => {
    if (startDate && endDate) {
      handleGetSelectedDates({ startDate, endDate });
    }
  };

  return (
    <DatePickerContainer>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={today} // Set minDate to today
        placeholderText="Start Date"
        customInput={<StyledInput />}
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate || today} // Set minDate to startDate or today
        maxDate={
          startDate
            ? new Date(startDate.getTime() + 15 * 24 * 60 * 60 * 1000)
            : null
        }
        placeholderText="End Date"
        customInput={<StyledInput />}
      />
      <StyledButton onClick={handleGetDates}>Get Selected Dates</StyledButton>
    </DatePickerContainer>
  );
};

export default DateRangePicker;
