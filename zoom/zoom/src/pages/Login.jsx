import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthLayout from '../layouts/AuthLayout';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login() {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState(location.state?.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(!!location.state?.email);
  const [error, setError] = useState('');
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (location.state?.email || location.state?.password) {
      // Clear the state so it doesn't stay if they refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/user/logindata`, {
        email, 
        password
      });

      if (response.data && response.data.token && response.data.user) {
        console.log("Login success, navigating...");
        login(response.data.user, response.data.token);
        
        // Fail-safe navigation
        navigate('/dashboard');
        setTimeout(() => {
          if (window.location.pathname === '/login') {
            window.location.href = '/dashboard';
          }
        }, 100);
      } else {
        setError('Login successful but user data missing. Please try again.');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('Failed to connect to server. Please try again later.');
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/googlelogin`, {
        id_token: credentialResponse.credential
      });

      if (response.data && response.data.token && response.data.user) {
        console.log("Google success, navigating...");
        login(response.data.user, response.data.token);
        
        // Fail-safe navigation
        navigate('/dashboard');
        setTimeout(() => {
          if (window.location.pathname === '/login' || window.location.pathname === '/register') {
            window.location.href = '/dashboard';
          }
        }, 100);
      } else {
        setError('Google Login successful but user data missing.');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Google Login failed. Please try again.');
    }
  };

  return (
    <AuthLayout>
      <div className="bg-[#1C1F2E] rounded-2xl w-full max-w-[440px] p-8 sm:p-10 shadow-lg shadow-black/50 border border-white/5">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-[#8c92a4] text-sm">Experience the future of interview prep</p>
        </div>

        {/* Primary Action: Google Login */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="w-full flex justify-center scale-110">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google Authentication failed')}
              theme="filled_blue"
              shape="pill"
              text="signin_with"
              width="300"
            />
          </div>
          <p className="text-[12px] text-[#5e6376] font-medium italic">Fast, secure & one-click access</p>
        </div>

        {/* Divider / Toggle */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-full border-t border-white/5"></div>
          {!showEmailForm ? (
            <button 
              onClick={() => setShowEmailForm(true)}
              className="text-[13px] font-bold text-[#00E5FF] hover:text-white transition-colors"
            >
              Sign in with Email Address
            </button>
          ) : (
            <div className="w-full animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Form */}
              <form onSubmit={handleLogin} className="mt-4">
                {error && (
                  <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                    {error}
                  </div>
                )}
                <div className="flex flex-col gap-2 mb-5">
                  <label className="text-xs font-bold text-[#8c92a4] uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 bg-[#0F111A] border border-white/5 rounded-lg text-[15px] text-white outline-none transition focus:border-[#00e5ff]/50 focus:ring-1 focus:ring-[#00e5ff]/30 placeholder:text-[#5e6376]" 
                    placeholder="name@example.com" 
                  />
                </div>
                
                <div className="flex flex-col gap-2 mb-8">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-[#8c92a4] uppercase tracking-wider">Password</label>
                    <a href="#" className="text-xs font-semibold text-[#00E5FF] hover:underline">Forgot?</a>
                  </div>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0F111A] border border-white/5 rounded-lg text-[15px] text-white outline-none transition focus:border-[#00e5ff]/50 focus:ring-1 focus:ring-[#00e5ff]/30 placeholder:text-[#5e6376] placeholder:tracking-widest" 
                      placeholder="••••••••" 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5e6376] hover:text-[#00e5ff] transition-colors"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full inline-flex justify-center items-center py-3.5 bg-[#00E5FF] text-[#0F111A] rounded-lg font-bold text-[15px] transition hover:bg-[#00cbe5] shadow-[0_0_15px_rgba(0,229,255,0.2)] active:scale-[0.99] border border-[#00e5ff]">
                  Access Dashboard
                </button>
              </form>
              <button 
                onClick={() => setShowEmailForm(false)}
                className="w-full text-center mt-6 text-[12px] text-[#5e6376] hover:text-white transition"
              >
                Go back to Google Sign-in
              </button>
            </div>
          )}
        </div>

        <div className="mt-10 text-center text-[13px] text-[#8c92a4] font-medium">
          New to InterviewReady? <Link to="/register" state={{ showEmailForm: true }} className="text-[#00E5FF] font-bold hover:underline">Create Account</Link>
        </div>
      </div>
    </AuthLayout>
  );
}

