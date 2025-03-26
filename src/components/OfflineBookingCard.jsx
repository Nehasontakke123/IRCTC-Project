import React, { useState, useEffect } from "react";
import axios from "axios";

const OfflineBookingCard = ({ booking, onCancel, onSync }) => {
  const [syncing, setSyncing] = useState(false);
  const [status, setStatus] = useState(booking?.status || "Pending");

  // Fetch latest booking status after syncing
  useEffect(() => {
    setStatus(booking?.status || "Pending");
  }, [booking]);

  // Sync Booking Status
  const handleSync = async () => {
    if (!booking?._id) {
      alert("Booking ID is missing! Cannot sync.");
      return;
    }

    setSyncing(true);
    try {
      const response = await axios.put(
        `https://irctc-backend-fyr2.vercel.app/offline-booking/update-status/${booking._id}`,
        { status: "Synced" }
      );

      const updatedBooking = response.data.updatedBooking;
      setStatus(updatedBooking.status);

      alert("Booking Synced Successfully!");
      if (onSync) onSync(updatedBooking); // Update Parent Component
    } catch (error) {
      console.error("Error syncing booking:", error);
      alert("Failed to sync booking!");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="booking-card">
      <h3>{booking?.trainName || "Unknown Train"}</h3>
      <p><strong>Train Number:</strong> {booking?.trainNumber || "N/A"}</p>
      <p><strong>Destination:</strong> {booking?.destination || "Unknown Destination"}</p>
      <p><strong>Date:</strong> {booking?.date || "N/A"}</p>
      <p><strong>Seat Class:</strong> {booking?.seatClass || "N/A"}</p>
      <p><strong>Status:</strong> <span className={status.toLowerCase()}>{status}</span></p>

      <h4>Passengers:</h4>
      <ul>
        {booking?.passengers?.length > 0 ? (
          booking.passengers.map((passenger, index) => (
            <li key={index}>{passenger.name} (Age: {passenger.age}, {passenger.gender})</li>
          ))
        ) : (
          <li>No Passengers</li>
        )}
      </ul>

      <button className="sync-btn" onClick={handleSync} disabled={syncing || status === "Synced"}>
        {syncing ? "Syncing..." : "Sync Now"}
      </button>
      <button className="cancel-btn" onClick={() => onCancel(booking._id)}>Cancel</button>
    </div>
  );
};

export default OfflineBookingCard;
