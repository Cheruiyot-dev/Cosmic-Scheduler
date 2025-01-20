//Scheduler form for collecting name, email and phone

import React from "react";
import { useAppState } from "../context/AppState";
import { TextField, Button, Box } from "@mui/material";

export const SchedulerForm: React.FC = () => {
    const { state, dispatch} = useAppState();

    const handleChange = (field: keyof typeof state.appointment, value: string) => {
        dispatch({ type: "SET_APPOINTMENT", payload: { [field]: value}});
    };

    const handleSubmit = () => {
        console.log("Appointment details:", state.appointment);
        
    };


    return (
        <Box sx={{ maxWidth: 400, mx: "auto", mt: 4}}>
            <TextField
            label = "Name"
            fullWidth
            value={state.appointment.name}
            onChange={(e) => handleChange("name", e.target.value)}
            sx={{mb: 2}}
            />
            <TextField
            label = "Email"
            fullWidth
            value={state.appointment.email}
            onChange={(e) => handleChange("email", e.target.value)}
            sx={{mb:2}}
            />

            <TextField
            label = "Phone"
            fullWidth
            value={state.appointment.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            sx={{mb: 2}}
            />
            <Button variant="contained" onClick={handleSubmit} sx={{ mt:2}}>
                Submit
            </Button>
        </Box>

    );

}