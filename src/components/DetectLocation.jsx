import React, { useState } from "react";

const DetectLocation = ({ setLocation }) => {
  const [error, setError] = useState("");

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setError("❌ Your browser does not support geolocation.");
      alert("❌ Your browser does not support geolocation.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation({ latitude, longitude }); // ✅ Set location correctly
        setError("");
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setError("❌ Location access denied. Please allow location access.");
          alert("❌ Location access denied. Please allow location access.");
        } else {
          setError("❌ Could not detect location. Please try again.");
          alert("❌ Could not detect location. Please try again.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div>
      <button onClick={handleDetectLocation} className="detect-location-btn">
        📍 Detect Location
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DetectLocation;


