import React, { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { Loader } from "lucide-react";

import "./App.css";
function App() {
  const { authProfile, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authProfile ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authProfile ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="login"
          element={!authProfile ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authProfile ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
