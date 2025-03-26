import React from "react";
import '../assets/css/Home.css'

const ChartVacancy = () => {
  return (
    <div className="chart-vacancy">
      <h2>Chart & Vacancy Information</h2>
      <p>Check chart and vacancy details for your train.</p>
      <input type="text" placeholder="Enter Train No." />
      <button>Check</button>
    </div>
  );
};

export default ChartVacancy;
