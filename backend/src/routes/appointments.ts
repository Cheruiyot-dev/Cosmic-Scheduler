import { Router } from 'express';
import { saveAppointment, getAppointments, deleteAppointment } from '../services/cosmicServices';

const router = Router();

// Get all appointments
router.get("/", async (req, res) => {
    try {
        const appointments = await getAppointments();
        res.status(200).json({message: "Appointments fetched successfully", data: appointments});
        
    } catch (error) {
        res.status(500).json({message: "Failed to fetch appointments"});
    }
});

//Create a new appointment
router.post("/", async(req, res) => {
    try {
        const appointment = req.body;
        console.log("Appointment is:", appointment);
        await saveAppointment(appointment);
        res.status(201).json({message: "New appointment saved"});
        
        
    } catch (error) {
        res.status(500).json({message: "Failed to save appointment"});
        
    }
});

//Delete an appointment

router.delete("/:id", (req, res) => {
    try {
        const { id} = req.params;
        deleteAppointment(id);
        console.log("Appointment deleted successfully");
        res.status(200).json({message: "Appointment deleted successfully"});
        
    } catch (error) {
        res.status(500).json({message: "Failed to delete appointment"});
        
    }
})


export default router;