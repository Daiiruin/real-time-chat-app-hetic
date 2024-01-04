import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { ProtectedRoute } from "./pages/ProtectedRoute/ProtectedRoute";
import { SignupPage } from "./pages/SignupPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
