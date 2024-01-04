import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData({});
    console.log("You have been logged out");
    navigate("/login");
  };

  return (
    <div>
      <p>Votre nom : {userData.name}</p>
      <p>Votre mail : {userData.email}</p>{" "}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};
