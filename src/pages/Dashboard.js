import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => async () => {
        try {
            await axios.get("http://backend-app.localhost/api/user", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            }).then(response => setUser(response.data));
        } catch (error) {
            if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
                await axios.post("http://backend-app.localhost/api/logout", {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }).then(() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                });
            }
            console.error(error);
        }
    }, [navigate]);

    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found");
            navigate("/login");
        }

        try {
            await axios.post('http://backend-app.localhost/api/logout', {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            ).then((response) => {
                localStorage.removeItem("token");
                navigate("/login");
            });

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h2>Welcome, {user?.data?.name || "User"}</h2>
                <p>Email: {user?.data?.email || "N/A"}</p>
                <p>Role: {user?.data?.role || "User"}</p>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;
