import React, { useState } from "react";
import "../assets/css/Holiday.css";
import maharajaExpress from "../assets/images/Maharaja-Express-1.png";  
import International from "../assets/images/Thailand.png";
import manali from "../assets/images/Manali.png";
import bharat from "../assets/images/bharat-gaurav.png";
import kashmir from "../assets/images/Kashmir.png";

const packages = [
  {
    id: 1,
    title: "Maharajas' Express",
    description:
      "Redefining Royalty, Luxury and Comfort, Maharajas' Express takes you on a sojourn to the era of bygone stately splendour of princely states. It has been a winner of 'World’s Leading Luxury Train' by World Travel Awards consecutively for the last six years.",
    image: maharajaExpress,
    price: "₹4,50,000 per person",
    duration: "7 Days / 6 Nights",
    highlights: [
      "5-star luxury cabins with private butler",
      "Gourmet dining and fine wines",
      "Guided heritage tours with exclusive access",
    ],
  },
  {
    id: 2,
    title: "International Packages",
    description:
      "Best deals in International Holiday packages for Thailand, Dubai, Sri Lanka, Europe, USA, and more. Inclusive of sightseeing, meals, visa charges, and insurance.",
    image: International,
    price: "Starting from ₹75,000",
    duration: "5-10 Days",
    highlights: [
      "Visa assistance & travel insurance",
      "Luxury hotels & sightseeing tours",
      "Affordable EMI options available",
    ],
  },
  {
    id: 3,
    title: "Domestic Air Packages",
    description:
      "From spiritual journeys to breathtaking landscapes, explore Tirupati, Rajasthan, Himalayas, and serene lakes with IRCTC.",
    image: manali,
    price: "₹30,000 per person",
    duration: "4 Days / 3 Nights",
    highlights: [
      "Airfare & comfortable hotel stays",
      "Daily breakfast & sightseeing",
      "Customized travel plans available",
    ],
  },
  {
    id: 4,
    title: "Bharat Gaurav Tourist Train",
    description:
      "IRCTC operates Bharat Gaurav Tourist Train with AC III-Tier accommodation, covering pilgrimage and heritage destinations.",
    image: bharat,
    price: "₹20,000 per person",
    duration: "5 Days / 4 Nights",
    highlights: [
      "Spiritual & heritage destinations",
      "Vegetarian meals included",
      "Experienced tour guides",
    ],
  },
  {
    id: 5,
    title: "Rail Tour Packages",
    description:
      "IRCTC offers rail tour packages with confirmed train tickets, sightseeing, and meals for destinations like Kashmir, Darjeeling, and Tirupati.",
    image: kashmir,
    price: "₹15,000 per person",
    duration: "5 Days / 4 Nights",
    highlights: [
      "Hassle-free rail ticket booking",
      "Meals & sightseeing included",
      "Comfortable accommodations",
    ],
  },
];

const Holiday = () => {
  const [selectedPackage, setSelectedPackage] = useState(null); // Store selected package

  return (
    <div className="holiday-container">
      {packages.map((pkg) => (
        <div key={pkg.id} className="holiday-card">
          <img src={pkg.image} alt={pkg.title} />
          <h2>{pkg.title}</h2>
          <p>{pkg.description.substring(0, 100)}...</p> {/* Short Description */}
          <button className="holiday-btn" onClick={() => setSelectedPackage(pkg)}>
            Read More →
          </button>
        </div>
      ))}

      {/* **Modal Component** */}
      {selectedPackage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setSelectedPackage(null)}>&times;</span>
            <h2>{selectedPackage.title}</h2>
            <img src={selectedPackage.image} alt={selectedPackage.title} className="modal-image" />
            <p><strong>Price:</strong> {selectedPackage.price}</p>
            <p><strong>Duration:</strong> {selectedPackage.duration}</p>
            <p>{selectedPackage.description}</p>
            <ul>
              {selectedPackage.highlights.map((point, index) => (
                <li key={index}>✅ {point}</li>
              ))}
            </ul>
            <button className="book-now-btn">Book Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Holiday;
