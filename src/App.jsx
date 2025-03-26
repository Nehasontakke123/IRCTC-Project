import { useState } from "react"; 
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EmergencyForm from "./components/EmergencyForm";
import EmergencyRequests from "./components/EmergencyRequests";
import OfflineBookingList from "./components/OfflineBookingList";
import OfflineBookingForm from "./components/OfflineBookingForm";
import Login from "./components/Login";
import Register from "./components/Register";
import ServicesSection from "./components/ServicesSection";
import Holiday from "./components/Holiday";
import PNRStatus from "./components/PNRStatus";
import Footer from "./components/Footer";

// import StationNavigation from "./components/StationNavigation";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/emergency-help" element={<EmergencyForm />} />
        <Route path="/emergency-requests" element={<EmergencyRequests />} />
        <Route path="/offline-booking" element={<OfflineBookingForm />} />
        <Route path="/offline-booking-list" element={<OfflineBookingList />} />
        <Route path="/pnr-status" element={<PNRStatus />} />
      </Routes>

      {/* <ServicesSection />
      <Holiday /> */}
      <Footer/>
     
    </>
  );
}

export default App;
