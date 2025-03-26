import { useState, useEffect } from "react";
import axios from "axios";
import '../assets/css/Register.css';

const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
};

const Register = () => {
    const [formData, setFormData] = useState({
        userName: "",
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        captcha: ""
    });
    const [captcha, setCaptcha] = useState("");

    useEffect(() => {
        setCaptcha(generateCaptcha());
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.captcha !== captcha) {
            alert("Captcha does not match!");
            return;
        }
        try {
            const res = await axios.post("https://irctc-backend-fyr2.vercel.app/auth/register", formData);
            alert(res.data.message);
        } catch (error) {
            alert(error.response.data.error || "Registration failed!");
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="userName" placeholder="User Name" required onChange={handleChange} />
                <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                <input type="text" name="mobile" placeholder="Mobile Number" required onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                
                <div className="captcha-container">
                    <span className="captcha-text">{captcha}</span>
                    <button type="button" onClick={refreshCaptcha} className="refresh-captcha">🔄</button>
                </div>
                <input type="text" name="captcha" placeholder="Enter Captcha" required onChange={handleChange} />
                
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;