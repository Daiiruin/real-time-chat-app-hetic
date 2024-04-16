import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((res) => {
        console.log(res);
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          console.log("Your token", res.data.token);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="page-container">
      <div className="signup-container">
        <h2>LogIn</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="xyz@email.com"
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <div className="password-container">
              <input
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
              />
              <p onClick={togglePasswordVisibility} className="show-password">
                {showPassword ? "Hide" : "Show"}
              </p>
            </div>
          </div>
          <button type="submit" className="buttonLogin">
            Sign Up
          </button>
        </form>

        <Link to="/register">
          <p className="login-link">
            You don't have an account ? Click <span>here</span> !
          </p>
        </Link>
      </div>
    </div>
  );
};
