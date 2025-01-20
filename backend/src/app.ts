import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import appointmentRoutes from "./routes/appointments";
dotenv.config();

//Initialize express app
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


//Routes
app.use("/api/appointments", appointmentRoutes);


// Base route
app.get("/", (req, res) => {
    res.send("Cosmic Scheduler Backend");
  });

//Server startup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
