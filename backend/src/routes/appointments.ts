import { Router } from 'express';

const router = Router();

// Get all appointments
router.get("/", async (req, res) => {
    try {
        res.status(200).json({message: "List of appointments"});
        
    } catch (error) {
        res.status(500).json({message: "Failed to fetch appointments"});
    }
});

//Create a new appointment
router.post("/", async(req, res) => {
    try {
        const appointment = req.body;
        console.log("Appointment is:", appointment);
        res.status(201).json({message: "New appointment saved", data: appointment});
        
        
    } catch (error) {
        res.status(500).json({message: "Failed to save appointment"});
        
    }
})


export default router;