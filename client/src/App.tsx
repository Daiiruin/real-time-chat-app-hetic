import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/HomePage/Home";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { ProtectedRoute } from "./pages/ProtectedRoute/ProtectedRoute";
import { SignupPage } from "./pages/SignupPage/SignupPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
};
