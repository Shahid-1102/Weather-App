import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';
import './DatePicker.css';

const DatePicker = ({ startDate, endDate, onStartDateChange, onEndDateChange, onGetHistoricalData }) => {

  const handleStartDateChange = (newDate) => {
    onStartDateChange(newDate);
  };

  const handleEndDateChange = (newDate) => {
    onEndDateChange(newDate);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleGetHistoricalData = () => {
    if (startDate && endDate) {
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        console.log("IN DATEPICKER","City:", city, "Start Date:", formattedStartDate, "End Date:", formattedEndDate);
        onGetHistoricalData(formattedStartDate, formattedEndDate);
    } else {
      alert("Please select both start and end dates.");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="date-picker-container">
        <DesktopDatePicker
          label="Start Date"
          inputFormat="MM/dd/yyyy"
          value={startDate}
          onChange={handleStartDateChange}
          textField={<TextField label="Start Date" variant="outlined" fullWidth />}
        />
        <DesktopDatePicker
          label="End Date"
          inputFormat="MM/dd/yyyy"
          value={endDate}
          onChange={handleEndDateChange}
          textField={<TextField label="End Date" variant="outlined" fullWidth />}
        />
      </div>

      <div className="button-container">
        <Button
          variant="contained"
          color="primary"
         onClick={() => onGetHistoricalData(startDate, endDate)} 
          disabled={!startDate || !endDate}
        >
          Get Historical Data
        </Button>
      </div>
    </LocalizationProvider>
  );
};

export default DatePicker;
