import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/ResetPasswordPage.css';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ResetPasswordPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    const query = useQuery();
    const token = query.get("token");
    const email = query.get("email");

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const response = await axios.post("http://backend-app.localhost/api/reset-password", {
                token,
                email,
                password,
                confirmPassword
            });


            setMessage(response.data.message);
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.data || {});
            } else {
                alert("Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-card">
                <h2>Reset Password</h2>
                {errors.token && <p className="error">{errors.token[0]}</p>}
                {errors.email && <p className="error">{errors.email[0]}</p>}
                {errors.password && <p className="error">{errors.password[0]}</p>}
                {errors.confirmPassword && <p className="error">{errors.confirmPassword[0]}</p>}
                {message && <p className="message">{message}</p>}
                <form onSubmit={handlePasswordReset}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            disabled
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Token"
                            value={token}
                            disabled
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        Reset Password
                    </button>
                </form>
                <div className="back-to-login">
                    <button onClick={() => navigate("/login")} className="back-btn">Back to Login</button>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;