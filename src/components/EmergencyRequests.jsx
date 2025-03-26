import { useEffect, useState } from "react";
import axios from "axios";
import EmergencyStatus from "./EmergencyStatus";
// import '../assets/css/EmergencyStatus.css'
import '../assets/css/EmergencyRequests.css'

const EmergencyRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "https://irctc-backend-fyr2.vercel.app/emergency-help/requests" // Change this for production
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching emergency requests:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg border">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">📋 Emergency Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500 text-center">No emergency requests found.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li key={req._id} className="p-4 border rounded bg-white shadow">
              <p><strong>Name:</strong> {req.name}</p>
              <p><strong>Age:</strong> {req.age}</p>
              <p><strong>Mobile:</strong> {req.mobile}</p>
              {/* ✅ Fix: Correct way to display location */}
              <p>
                <strong>Location:</strong>{" "}
                {req.location && req.location.lat && req.location.lng
                  ? `Lat: ${req.location.lat}, Lng: ${req.location.lng}`
                  : "Not Available"}
              </p>
              <p><strong>Message:</strong> {req.message}</p>
              <p><strong>Category:</strong> {req.category}</p>

              <EmergencyStatus requestId={req._id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmergencyRequests;








