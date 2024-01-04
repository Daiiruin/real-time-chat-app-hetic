import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

export const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Enter your name..."
          id="username"
          name="username"
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="submit" className="buttonRegister">
          Sign Up
        </button>
      </form>

      <Link to="/login">
        <p className="login-link">Already have an account ? Click here !</p>
      </Link>
    </div>
  );
};
