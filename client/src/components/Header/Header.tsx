import axios from "axios";
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import emptyImage from "../../images/high.jpg";
import "./Header.css";

export const Header = () => {
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
    <header>
      <button onClick={handleLogout}>
        <CiLogout size={24} />
      </button>
      <div className="userInfo">
        <img src={emptyImage} alt="avatar" />
        <p>{userData.name}</p>
      </div>
      <button>
        <LiaUserFriendsSolid size={24} />
      </button>
    </header>
  );
};
