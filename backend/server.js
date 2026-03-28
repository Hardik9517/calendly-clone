const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

// Temporary data
let availability = [];
let bookings = [];

// Add availability
app.post("/availability", (req, res) => {
  availability.push({ startTime: "09:00", endTime: "17:00" });
  res.json({ message: "Added" });
});

// Get availability
app.get("/availability", (req, res) => {
  res.json(availability);
});

// Book slot
app.post("/book", (req, res) => {
  if (bookings.length > 0) return res.json({ message: "Already booked" });
  bookings.push({ booked: true });
  res.json({ message: "Booking successful" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});