import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import GameReport from "@/pages/GameReport";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import AuthGuard from '@/components/AuthGuard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const login = (username: string) => {
    setIsAuthenticated(true);
    setCurrentUser(username);
    localStorage.setItem('user', username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, login, logout }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/search" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/search" /> : <Register />} />
        <Route path="/search" element={<AuthGuard><Search /></AuthGuard>} />
        <Route path="/report/:gameId" element={<AuthGuard><GameReport /></AuthGuard>} />
      </Routes>
    </AuthContext.Provider>
  );
}
