import React, { useState, useEffect } from "react";


const EmergencyStatus = ({ requestId }) => {
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

 
 useEffect(() => {
    console.log("Request ID:", requestId); // 🟢 Debugging
    if (!requestId) {
      console.error("Error: Request ID is missing!");
      return;
    }
  
    const fetchStatus = async () => {
  try {
    const response = await fetch(`http://localhost:5000/emergency-help/status/${requestId}`);
    const data = await response.json();
    console.log("Fetched Data:", data); 

    if (data.status) {
      setStatus(data.status);
    } else {
      console.error("❌ Error fetching status:", data.error);
    }
  } catch (error) {
    console.error("❌ Fetch Status Error:", error);
  }
};

  
    fetchStatus();
  }, [requestId]);
  

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`http://localhost:5000/emergency-help/status/${requestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus(newStatus);
        setSuccess("Status updated successfully!");
      } else {
        setError(data.error || "Failed to update status");
      }
    } catch (error) {
      setError("Error updating status");
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="status-container">
      <h3 className="text-lg font-semibold">
        Emergency Status: <span className={`status ${status}`}>{status}</span>
      </h3>

      <div className="status-buttons flex gap-2 mt-2">
        <button 
          onClick={() => handleStatusChange("in-progress")} 
          disabled={loading || status === "in-progress"} 
          className={`btn-warning ${status === "in-progress" ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Updating..." : "Mark as In Progress"}
        </button>
        <button 
          onClick={() => handleStatusChange("resolved")} 
          disabled={loading || status === "resolved"} 
          className={`btn-success ${status === "resolved" ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Updating..." : "Mark as Resolved"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
};

export default EmergencyStatus;
