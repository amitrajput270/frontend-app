import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ForgetPasswordPage.css";

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await axios.post("http://backend-app.localhost/api/forget-password", { email });
            setLoading(false);
            const parsedUrl = new URL(response.data.data.resetLink);
            const tokenParam = parsedUrl.searchParams.get('token');
            const emailParam = parsedUrl.searchParams.get('email');

            const resetUrl = `${window.location.origin}/reset-password?token=${tokenParam}&email=${emailParam}`;
            setMessage(`Success: Password reset link sent to ${email}. and select the link to reset your password.` + resetUrl);

        } catch (error) {
            setLoading(false);
            setMessage("Error: Unable to send password reset link. Please try again.");
        }
    };

    return (
        <div className="forget-password-container">
            <div className="forget-password-card">
                <h2>Forgot Password</h2>
                {message && <p className={message.includes("Error") ? "error-message" : "success-message"}>{message}</p>}
                <form onSubmit={handlePasswordReset}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
                <button onClick={() => navigate("/login")}>Back to Login</button>
            </div>
        </div>
    );
};

export default ForgetPasswordPage;