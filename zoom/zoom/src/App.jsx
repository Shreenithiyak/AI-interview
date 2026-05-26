import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RoleProvider } from './context/RoleContext';
import { CompanyProvider } from './context/CompanyContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import QuestionBank from './pages/QuestionBank';
import Simulator from './pages/Simulator';

import Analytics from './pages/Analytics';
import LandingSimulator from './pages/LandingSimulator';
import Profile from './pages/Profile';

import { SettingsProvider } from './context/SettingsContext';
import Settings from './pages/Settings';

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <SettingsProvider>
          <CompanyProvider>
            <RoleProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/practice" element={<Practice />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/questions" element={<QuestionBank />} />
                  <Route path="/simulator" element={<Simulator />} />
                  <Route path="/landing-simulator" element={<LandingSimulator />} />
                </Routes>
              </BrowserRouter>
            </RoleProvider>
          </CompanyProvider>
        </SettingsProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

