import { useState } from "react";
import axios from "axios";
import '../assets/css/OfflineBookingForm.css';

const OfflineBookingForm = () => {
  const [formData, setFormData] = useState({
    trainName: "",
    trainNumber: "",
    destination: "",  // ✅ Destination add केलं
    date: "",
    seatClass: "",
    passengers: [{ name: "", age: "", gender: "" }],
  });

  const [offlineBookings, setOfflineBookings] = useState([]); // Store fetched data

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      const updatedPassengers = [...formData.passengers];
      updatedPassengers[index][name] = value;
      setFormData({ ...formData, passengers: updatedPassengers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addPassenger = () => {
    setFormData({
      ...formData,
      passengers: [...formData.passengers, { name: "", age: "", gender: "" }],
    });
  };

  const removePassenger = (index) => {
    const updatedPassengers = formData.passengers.filter((_, i) => i !== index);
    setFormData({ ...formData, passengers: updatedPassengers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending Data:", formData); // Debugging line

    try {
      const response = await axios.post("https://irctc-backend-fyr2.vercel.app/offline-booking/create", formData, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Offline Booking Saved Successfully!");
      console.log(response.data);

      // Reset form after successful submission
      setFormData({
        trainName: "",
        trainNumber: "",
        destination: "",
        date: "",
        seatClass: "",
        passengers: [{ name: "", age: "", gender: "" }],
      });
    } catch (error) {
      console.error("Error saving booking:", error.response?.data || error.message);
      alert("Failed to save booking!");
    }
  };

  // Fetch Offline Bookings
  const fetchOfflineBookings = async () => {
    try {
      const response = await axios.get("https://irctc-backend-fyr2.vercel.app/offline-booking/all");
      setOfflineBookings(response.data);
    } catch (error) {
      console.error("Error fetching offline bookings:", error);
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Offline Ticket Booking</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="trainName" placeholder="Train Name" value={formData.trainName} onChange={handleChange} required />
        <input type="text" name="trainNumber" placeholder="Train Number" value={formData.trainNumber} onChange={handleChange} required />
        
        {/* ✅ Destination Input Added */}
        <input type="text" name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} required />
        
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <select name="seatClass" value={formData.seatClass} onChange={handleChange} required>
          <option value="">Select Class</option>
          <option value="Sleeper">Sleeper</option>
          <option value="AC">AC</option>
          <option value="General">General</option>
        </select>

        <h3>Passengers</h3>
        {formData.passengers.map((passenger, index) => (
          <div key={index} className="passenger-group">
            <input type="text" name="name" placeholder="Name" value={passenger.name} onChange={(e) => handleChange(e, index)} required />
            <input type="number" name="age" placeholder="Age" value={passenger.age} onChange={(e) => handleChange(e, index)} required />
            <select name="gender" value={passenger.gender} onChange={(e) => handleChange(e, index)} required>
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <button type="button" onClick={() => removePassenger(index)} className="remove-passenger">X</button>
          </div>
        ))}

        <button type="button" onClick={addPassenger} className="add-passenger">+ Add Passenger</button>
        <button type="submit" className="submit-booking">Submit Booking</button>
      </form>

      <button onClick={fetchOfflineBookings} className="fetch-bookings">Fetch Offline Bookings</button>

      {/* Display Offline Bookings */}
      <div className="offline-bookings">
        <ul>
          {offlineBookings.map((booking, index) => (
            <li key={index}>
              {booking.trainName} - {booking.trainNumber} - {booking.destination} - {booking.date} {/* ✅ Destination added here */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OfflineBookingForm;
