import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState("");

  const BASE_URL = "http://localhost:5000";

  const addAvailability = async () => {
    try {
      // Example: you can add multiple slots
      const payload = { startTime: "09:00", endTime: "17:00" };
      await axios.post(`${BASE_URL}/availability`, payload);
      setMessage("Availability added ✅");
      getAvailability();
    } catch (error) {
      console.error(error);
      setMessage("Error adding availability");
    }
  };

  const getAvailability = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/availability`);
      setSlots(res.data);
      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("Error fetching availability");
    }
  };

  const bookSlot = async (slotId) => {
    try {
      const res = await axios.post(`${BASE_URL}/book`, { slotId });
      setMessage(res.data.message);
      getAvailability();
    } catch (error) {
      console.error(error);
      setMessage("Error booking slot");
    }
  };

  return (
    <div className="App">
      <h1>Booking App</h1>

      <button onClick={addAvailability}>Add Availability</button>
      <button onClick={getAvailability}>Get Availability</button>

      {message && <h3>{message}</h3>}

      <h3>Availability:</h3>
      <ul>
        {slots.length === 0 && <li>No slots available</li>}
        {slots.map((slot) => (
          <li key={slot.id}>
            {slot.startTime} - {slot.endTime}{" "}
            {slot.booked ? (
              <strong>(Booked)</strong>
            ) : (
              <button onClick={() => bookSlot(slot.id)}>Book</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;