import React from "react";
import { Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

function DateTimePickers({ value, onChange, error, helperText }) {
  const handleDateChange = (date) => {
    if (date) {
      const newDateTime = new Date(date);
      newDateTime.setHours(23, 0, 0, 0); // Set time to 11:00 PM
      onChange(newDateTime);
    }
  };

  const handleTimeChange = (time) => {
    if (time) {
      const newDateTime = new Date(value);
      newDateTime.setHours(time.getHours(), time.getMinutes());
      onChange(newDateTime);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction="row" spacing={2}>
        <DatePicker
          label="Date"
          value={value}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              size: "small",
              error,
              helperText,
            },
          }}
        />
        <TimePicker
          label="Time"
          value={value}
          onChange={handleTimeChange}
          slotProps={{
            textField: {
              size: "small",
              error,
              helperText,
            },
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
}

export default DateTimePickers;
