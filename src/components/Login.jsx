import { useState } from "react";
import "../assets/css/Login.css";
import Register from "./Register";

function Login() {
  const [showForm, setShowForm] = useState("login"); // 'login' | 'register' | 'agent'
  const [showPopup, setShowPopup] = useState(false); // Popup control

  const handleFormSwitch = (formType) => {
    setShowForm(formType);
  };

  return (
    <div className="container">
      {/* Login Form */}
      {showForm === "login" && (
        <form className="form">
          <h2 className="heading">LOGIN</h2>
          <label className="label">Email</label>
          <input type="email" className="input" required />
          <label className="label">Password</label>
          <input type="password" className="input" required />
          <button type="submit" className="submitBtn">SIGN IN</button>
          <button onClick={() => handleFormSwitch("register")} className="toggleBtn">REGISTER</button>
          <button onClick={() => setShowPopup(true)} className="toggleBtn">AGENT LOGIN</button>
        </form>
      )}

      {/* Register Form */}
      {showForm === "register" && <Register onBack={() => handleFormSwitch("login")} />}

      {/* Agent Login Form */}
      {showForm === "agent" && (
        <div className="agent-container">
          <h2>Agent Login</h2>
          <label className="label">Agent ID</label>
          <input type="text" className="input" required />
          <label className="label">Password</label>
          <input type="password" className="input" required />
          <button type="submit" className="submitBtn">LOGIN</button>
          <button onClick={() => handleFormSwitch("login")} className="backBtn">Back to Login</button>
        </div>
      )}

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h3>Confirmation</h3>
            <ul>
              <li>That I will not use IRCTC personal User ID to book tickets for my Customer.</li>
              <li>That I will not overcharge the customer over and above the IRCTC Prescribed ticket fare.</li>
              <li>That I will not alter the contents of ERS.</li>
              <li>That I will abide by all the IRCTC Rules and Regulations.</li>
            </ul>
            <button 
              onClick={() => {
                setShowPopup(false);
                setShowForm("agent");
              }} 
              className="agreeBtn"
            >
              ✅ I Agree
            </button>
            <button 
              onClick={() => setShowPopup(false)} 
              className="cancelBtn"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
