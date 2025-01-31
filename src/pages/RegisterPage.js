import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/RegisterPage.css";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            await axios.post("http://backend-app.localhost/api/register", { name, email, password });
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.data || {});
            } else {
                alert("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Register</h2>
                {errors.name && <p className="error">{errors.name[0]}</p>}
                {errors.email && <p className="error">{errors.email[0]}</p>}
                {errors.password && <p className="error">{errors.password[0]}</p>}

                <form onSubmit={handleRegister}>
                    <input type="text" placeholder="Name" value={name}
                        onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="Email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Register</button>
                </form>
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    );
};

export default RegisterPage;
