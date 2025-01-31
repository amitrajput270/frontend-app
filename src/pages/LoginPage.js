import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LoginPage.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post("http://backend-app.localhost/api/login", {
                email,
                password,
            });
            localStorage.setItem("token", response.data.data.token);
            navigate("/");
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message || "Login failed. Please try again.");
            } else {
                alert("Login failed. Please try again.");
            }

        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email}
                        onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <a href="/register">Register</a></p>
                <p><a href="/forget-password">Forgot Password?</a></p>
            </div>
        </div>
    );
};

export default LoginPage;
