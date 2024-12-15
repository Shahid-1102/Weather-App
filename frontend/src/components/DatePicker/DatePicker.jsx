import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';
import './DatePicker.css';

const DatePicker = ({ onStartDateChange, onEndDateChange, onGetHistoricalData }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (newDate) => {
    setStartDate(newDate);
    onStartDateChange(newDate);
  };

  const handleEndDateChange = (newDate) => {
    setEndDate(newDate);
    onEndDateChange(newDate);
  };

  const handleGetHistoricalData = () => {
    if (startDate && endDate) {
      onGetHistoricalData(startDate, endDate);
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
          onClick={handleGetHistoricalData}
          disabled={!startDate || !endDate}
        >
          Get Historical Data
        </Button>
      </div>
    </LocalizationProvider>
  );
};

export default DatePicker;
