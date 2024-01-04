import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <div className="signup-container">
      <h2>LogIn</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="email">Email:</label>
        <input
          placeholder="Enter your email..."
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
        />

        <button type="submit" className="buttonLogin">
          Sign Up
        </button>
      </form>

      <Link to="/register">
        <p className="login-link">Already have an account ? Click here !</p>
      </Link>
    </div>
  );
};
