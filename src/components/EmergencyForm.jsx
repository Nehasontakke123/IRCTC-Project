import React, { useState } from "react";
import axios from "axios";
import "../assets/css/EmergencyForm.css";
import AlertIcon from "../assets/images/alarm.png";
import SendIcon from "../assets/images/send-message.png";
import DetectLocation from "./DetectLocation";

const EmergencyForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile: "",
    location: "", // ✅ Location now stored correctly
    message: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Set location from DetectLocation component
  const setLocation = ({ latitude, longitude }) => {
    setFormData((prevData) => ({
      ...prevData,
      location: `Lat: ${latitude}, Lng: ${longitude}`, // ✅ Display correctly
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!formData.location) {
      setError("❌ Please allow location access.");
      setLoading(false);
      return;
    }

    console.log("📤 Sending request with data:", formData);

    try {
      const response = await axios.post(
        `http://localhost:5000/emergency-help/send`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("✅ API Response:", response.data);

      if (response.status === 201 || response.status === 200) {
        setSuccess("✅ Emergency request sent successfully!");
        setFormData({
          name: "",
          age: "",
          mobile: "",
          location: "",
          message: "",
          category: "",
        });
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (err) {
      console.error("❌ API Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "❌ Failed to send emergency request. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="emergency-form-container">
      <h2>
        <img src={AlertIcon} alt="Alert" /> Emergency Help Request
      </h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="location"
            placeholder="Detected Location"
            value={formData.location}
            readOnly
            required
          />
          <DetectLocation setLocation={setLocation} />
        </div>

        <div className="form-group">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Emergency Type</option>
            <option value="Medical">Medical</option>
            <option value="Fire">Fire</option>
            <option value="Accident">Accident</option>
            <option value="Crime">Crime</option>
          </select>
        </div>

        <div className="form-group">
          <textarea
            name="message"
            placeholder="Describe the emergency"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="send-alert" disabled={loading}>
          <img src={SendIcon} alt="Send" /> {loading ? "Sending..." : "Send Alert"}
        </button>
      </form>
    </div>
  );
};

export default EmergencyForm;
