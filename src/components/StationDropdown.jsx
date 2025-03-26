import React, { useState, useEffect } from "react";

const StationDropdown = ({ onSelect }) => {
  const [stations, setStations] = useState([]);  
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredStations, setFilteredStations] = useState([]); 
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/stations");
        const data = await response.json();
        setStations(data); 
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    fetchStations();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredStations([]);
      return;
    }
    const filtered = stations.filter((station) =>
      station.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredStations(filtered);
  }, [searchTerm, stations]);

  const handleSelect = (stationName) => {
    setSearchTerm(stationName);
    onSelect(stationName);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-64">
      <input
        type="text"
        className="w-full p-2 border rounded-lg shadow-sm"
        placeholder="Select Station..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setShowDropdown(true);
        }}
      />
      {showDropdown && filteredStations.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-md max-h-40 overflow-auto">
          {filteredStations.map((station, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(station.name)}
            >
              {station.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StationDropdown;
