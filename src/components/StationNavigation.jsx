// import { useEffect, useState } from "react";
// import axios from "axios"; // Axios import कर

// const StationNavigation = ({ stationName }) => {
//   const [station, setStation] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchStation = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/stations/${stationName}`);
//         console.log("Fetched Station Data:", res.data); // Debugging
//         setStation(res.data);
//       } catch (err) {
//         console.error("Error fetching station:", err);
//         setError("❌ Station not found or server error");
//       }
//     };

//     fetchStation();
//   }, [stationName]);

//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (!station) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>{station.name} 🚉</h1>
//       <p>Location: {station.location?.lat}, {station.location?.lon}</p>
      
//       <h3>Platforms:</h3>
//       <ul>
//         {station.platforms?.map((p, index) => (
//           <li key={index}>Platform {p.number}: {p.location?.lat}, {p.location?.lon}</li>
//         ))}
//       </ul>

//       <h3>Exits:</h3>
//       <ul>
//         {station.exits?.map((e, index) => (
//           <li key={index}>{e.name}: {e.location?.lat}, {e.location?.lon}</li>
//         ))}
//       </ul>

//       <h3>Facilities:</h3>
//       <ul>
//         {station.facilities?.map((f, index) => (
//           <li key={index}>{f.name} ({f.type}): {f.location?.lat}, {f.location?.lon}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StationNavigation;





import { useEffect, useState } from "react";
import axios from "axios";

const StationNavigation = ({ stationName }) => {
  const [station, setStation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const encodedStationName = encodeURIComponent(stationName);
        const res = await axios.get(`https://irctc-backend-fyr2.vercel.app/api/stations/${encodedStationName}`);
        
        console.log("Fetched Station Data:", res.data);
        setStation(res.data);
      } catch (err) {
        console.error("Error fetching station:", err);
        
        if (err.response) {
          setError(`❌ Error ${err.response.status}: ${err.response.data.message}`);
        } else {
          setError("❌ Failed to fetch station data.");
        }
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
      
      <h3>Platforms:</h3>
      <ul>
        {station.platforms?.map((p, index) => (
          <li key={index}>Platform {p.number}: {p.location?.lat}, {p.location?.lon}</li>
        ))}
      </ul>

      <h3>Exits:</h3>
      <ul>
        {station.exits?.map((e, index) => (
          <li key={index}>{e.name}: {e.location?.lat}, {e.location?.lon}</li>
        ))}
      </ul>
    </div>
  );
};

export default StationNavigation;
