import React, { useState } from "react";
import axios from "axios";

const VoiceBooking = () => {
    const [voiceText, setVoiceText] = useState("");
    const [message, setMessage] = useState("");

    const handleBookTicket = async () => {
        try {
            const res = await axios.post("http://localhost:5000/api/book-ticket/voice", { voiceText, userId: "12345" });
            setMessage(`Ticket booked! PNR: ${res.data.ticket.pnr}`);
        } catch (error) {
            setMessage("Error booking ticket!");
        }
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">🎙 Voice Ticket Booking</h2>
            <input
                type="text"
                value={voiceText}
                onChange={(e) => setVoiceText(e.target.value)}
                placeholder="Say your destination..."
                className="w-full p-2 border rounded-md"
            />
            <button onClick={handleBookTicket} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
                Book Ticket
            </button>
            {message && <p className="mt-2 text-green-600">{message}</p>}
        </div>
    );
};

export default VoiceBooking;
