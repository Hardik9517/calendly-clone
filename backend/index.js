// server.js
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

// TEMP DATA (in-memory)
let availability = [];
let bookings = [];

// ADD AVAILABILITY
app.post("/availability", (req, res) => {
  const { startTime, endTime } = req.body;

  if (!startTime || !endTime) {
    return res.status(400).json({ message: "Start and End time required" });
  }

  const newSlot = {
    id: availability.length + 1, // unique id
    startTime,
    endTime,
    booked: false,
  };

  availability.push(newSlot);
  res.json({ message: "Availability added", slot: newSlot });
});

// GET AVAILABILITY
app.get("/availability", (req, res) => {
  res.json(availability);
});

// BOOK SLOT
app.post("/book", (req, res) => {
  const { slotId } = req.body;

  if (!slotId) {
    return res.status(400).json({ message: "Slot ID required" });
  }

  const slot = availability.find(
    (s) => s.id === Number(slotId)
  );

  if (!slot) {
    return res.status(404).json({ message: "Slot not found" });
  }

  if (slot.booked) {
    return res.json({ message: "Slot already booked" });
  }

  slot.booked = true;
  bookings.push(slot);
  res.json({ message: "Booking successful", slot });
});

// START SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});