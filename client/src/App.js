import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./authPages/Login/LoginPage";
import RegisterPage from "./authPages/register/RegisterPage";
import Dashboard from "./dashboard/Dashboard";
import AlertNotification from "./shared/components/AlertNotification";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Routes>
      <AlertNotification />
    </>
  );
}

export default App;
