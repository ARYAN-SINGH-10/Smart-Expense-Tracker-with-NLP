import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <Router>
      {/* App Shell navbar only on authenticated pages */}
      {token && (
        <nav className="navbar">
          <div className="navbar-brand">
            <span>💰</span> SpendSmart
            <span className="brand-dot"></span>
          </div>
          <div className="navbar-nav">
            <span className="nav-user-badge">👤 {user?.name}</span>
            <button onClick={logout} className="btn btn-danger btn-sm" style={{ borderRadius: '99px' }}>Logout</button>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <AuthPage onLogin={login} isRegister={false} />} />
        <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <AuthPage onLogin={login} isRegister={true} />} />
        <Route
          path="/dashboard"
          element={token ? (
            <div className="container" style={{ paddingTop: '2rem' }}>
              <Dashboard token={token} />
            </div>
          ) : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
