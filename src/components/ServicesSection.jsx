import React from "react";
import { FaPlane, FaHotel, FaChartLine, FaConciergeBell, FaBus, FaUmbrellaBeach, FaTrain, FaMountain, FaSubway, FaImages } from "react-icons/fa";
import '../assets/css/ServicesSection.css'

const services = [
  { name: "FLIGHTS", icon: <FaPlane /> },
  { name: "HOTELS", icon: <FaHotel /> },
  { name: "RAIL DRISHTI", icon: <FaChartLine /> },
  { name: "E-CATERING", icon: <FaConciergeBell /> },
  { name: "BUS", icon: <FaBus /> },
  { name: "HOLIDAY PACKAGES", icon: <FaUmbrellaBeach /> },
  { name: "TOURIST TRAIN", icon: <FaTrain /> },
  { name: "HILL RAILWAYS", icon: <FaMountain /> },
  { name: "CHARTER TRAIN", icon: <FaSubway /> },
  { name: "GALLERY", icon: <FaImages /> },
];

export default function ServicesSection() {
  return (
    <div className="services-section">
      {/* Headings placed at the top */}
      <div className="services-header">
        <h1>Have you not found the right one?</h1>
        <h1>Find a service suitable for you here.</h1>
      </div>

      <div className="services-container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-item" key={index}>
              <div className="icon">{service.icon}</div>
              <p>{service.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


