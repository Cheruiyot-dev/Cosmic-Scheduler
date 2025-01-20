import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import { TextField, Box } from "@mui/material";
import { useAppState } from "../context/AppState";

export const DatePickerComponent: React.FC = () => {
  const { state, dispatch } = useAppState();

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      dispatch({ type: "SET_APPOINTMENT", payload: { date: date.toISOString() } });
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Select a Date"
        value={state.appointment.date ? dayjs(state.appointment.date) : null}
        onChange={handleDateChange}
        slotProps={{ textField: { fullWidth: true } }}
      />
    </LocalizationProvider>
    </Box>
  );
};