import { useEffect, useState } from "react";
import axios from "axios";

const ARNavigation = ({ stationName }) => {
  const [station, setStation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const response = await axios.get(`https://irctc-backend-fyr2.vercel.app/api/stations/${stationName}/ar`);
        setStation(response.data);
      } catch (err) {
        console.error("Error fetching station:", err);
        setError("Station not found");
      }
    };

    fetchStation();
  }, [stationName]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!station) return <p>Loading...</p>;

  return (
    <div>
      <h1>{station.name} 🚉</h1>
      <p>Location: {station.location?.lat}, {station.location?.lon}</p>
    </div>
  );
};

export default ARNavigation;
