import React, { useState, useEffect } from "react";
import axios from "axios";
import OfflineBookingCard from "./OfflineBookingCard";
import '../assets/css/OfflineBookingList.css'
const OfflineBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const fetchOfflineBookings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/offline-booking/all");
        console.log("📌 Fetched Bookings:", response.data); // Debugging
        setBookings(response.data || []); // 🛠 Handle Empty Response
      } catch (error) {
        console.error("❌ Error fetching offline bookings:", error);
      }
    };

    fetchOfflineBookings();

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Handle Booking Sync Update
  const handleSyncUpdate = (updatedBooking) => {
    setBookings((prevBookings) =>
      prevBookings.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
    );
    console.log(`✅ Booking ID ${updatedBooking._id} synced successfully.`);
  };

  const handleCancel = (id) => {
    setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
    console.log(`❌ Booking ID ${id} canceled locally.`);
  };

  return (
    <div className={`booking-container ${!isOnline ? "offline-mode" : ""}`}>
      {!isOnline && <div className="offline-banner">⚠️ Offline Mode - Bookings Pending Sync</div>}

      {/* <h2>🚀 Pending Bookings</h2> */}

      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          booking ? (
            <OfflineBookingCard
              key={booking._id || index}
              booking={booking}
              onCancel={handleCancel} 
              onSync={handleSyncUpdate} // ✅ Pass handleSyncUpdate to Sync UI
            />
          ) : (
            <p key={index} className="error-message">⚠️ Invalid Booking Data</p>
          )
        ))
      ) : (
        <p className="no-bookings">No Bookings Available</p>
      )}
    </div>
  );
};

export default OfflineBookingList;
