import React, { useEffect } from 'react'
import Navbar from "./components/Navbar.jsx"
import { Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import SettingsPage from "./pages/SettingsPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import {useAuthStore} from "./store/useAuthStore.js"

import './App.css'
function App() {

    const {authProfile, checkAuth} = useAuthStore()

    useEffect(()=>{
        checkAuth();
    }, [checkAuth])
    
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/signup" element={<SignupPage/>} />
                <Route path="login" element={<LoginPage/>} />
                <Route path="/settings" element={<SettingsPage/>} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </>
    )
}

export default App
