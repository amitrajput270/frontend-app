import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => async () => {
        const token = localStorage.getItem("token");
        if (token === "undefined" || token === null) {
            navigate("/login");
        }

        await axios.get("http://backend-app.localhost/api/user", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then((response) => {
            if (response.status === 200) {
                setUser(response.data);
            } else {
                console.log("Failed to fetch user data", response);
            }
        }).catch((error) => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                console.error("Failed to fetch user data", error);
            }
        });
    }, [navigate]);

    const handleLogout = async () => {
        await axios.post('http://backend-app.localhost/api/logout', {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        ).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                console.log("Failed to logout", response);
            }
        }).catch((error) => {
            console.error("Failed to logout", error);
        });
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
