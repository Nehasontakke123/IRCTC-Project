import React, { useState } from "react";
import '../assets/css/PNRStatus.css'

const PNRStatus = () => {
    const [pnr, setPnr] = useState("");  // PNR Input State
    const [status, setStatus] = useState(null); // PNR Status

    // 🎤 Voice Recognition Function
    const handleVoiceSearch = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";

        recognition.onstart = () => {
            console.log("Listening...");
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setPnr(transcript.replace(/\D/g, ""));  // Extract only numbers (PNR)
        };

        recognition.onerror = (event) => {
            console.error("Error with speech recognition:", event.error);
        };

        recognition.start();
    };

    // 🚆 Fetch PNR Status
    const checkPNRStatus = async () => {
        const response = await fetch(`https://irctc-backend-fyr2.vercel.app/api/bookings/pnr-status/${pnr}`);
        const data = await response.json();
        setStatus(data);
    };

    return (
        <div className="pnr-status-container">
            <h2>🎟️ Check PNR Status</h2>
            <div className="input-container">
                <input 
                    type="text" 
                    placeholder="Enter PNR Number" 
                    value={pnr} 
                    onChange={(e) => setPnr(e.target.value)} 
                />
                <button onClick={handleVoiceSearch}>🎤</button>
                <button onClick={checkPNRStatus}>Check Status</button>
            </div>
            {status && (
                <div className="status-result">
                    <h3>✅ PNR Status Found!</h3>
                    <p><strong>PNR:</strong> {status.pnr}</p>
                    <p><strong>Source:</strong> {status.source}</p>
                    <p><strong>Destination:</strong> {status.destination}</p>
                    <p><strong>Date:</strong> {status.date}</p>
                </div>
            )}
        </div>
    );
};

export default PNRStatus;
