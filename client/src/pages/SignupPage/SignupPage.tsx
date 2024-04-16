import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

export const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register", { name, email, password })
      .then((res) => {
        console.log(res);
        navigate("/login");
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
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="Enter your name..."
              id="username"
              name="username"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              placeholder="Enter your email..."
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
                placeholder="Enter your password..."
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

          <button type="submit" className="buttonRegister">
            Sign Up
          </button>
        </form>

        <Link to="/login">
          <p className="login-link">
            Already have an account ? Click <span>here</span> !
          </p>
        </Link>
      </div>
    </div>
  );
};
