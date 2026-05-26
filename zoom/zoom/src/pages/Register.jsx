import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthLayout from '../layouts/AuthLayout';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Please fill in all fields.');

      return;
    }

    try {
      await axios.post(`${API_URL}/api/user/sentdata`, {
        name, 
        email, 
        password
      });

      navigate('/login', { state: { email, password } });
      setName('');
      setEmail('');
      setPassword('');
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
          if (window.location.pathname === '/register' || window.location.pathname === '/login') {
            window.location.href = '/dashboard';
          }
        }, 100);
      } else {
        setError('Google Registration successful but user data missing.');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Google Registration failed. Please try again.');
    }
  };


  const [showEmailForm, setShowEmailForm] = useState(location.state?.showEmailForm || false);

  return (
    <AuthLayout>
      <div className="bg-[#1C1F2E] rounded-2xl w-full max-w-[440px] p-8 sm:p-10 shadow-lg shadow-black/50 border border-white/5">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-[#8c92a4] text-sm">Join the elite interview preparation platform</p>
        </div>

        {/* Primary Action: Google Sign Up */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="w-full flex justify-center scale-110">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setError('Google Authentication failed')}
              theme="filled_blue"
              shape="pill"
              text="signup_with"
              width="300"
            />
          </div>
          <p className="text-[12px] text-[#5e6376] font-medium italic">The fastest way to get started</p>
        </div>

        {/* Divider / Toggle */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-full border-t border-white/5"></div>
          {!showEmailForm ? (
            <button 
              onClick={() => setShowEmailForm(true)}
              className="text-[13px] font-bold text-[#00E5FF] hover:text-white transition-colors"
            >
              Or create account using email
            </button>
          ) : (
            <div className="w-full animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Form */}
              <form onSubmit={handleRegister} className="mt-4">
                {error && (
                  <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                    {error}
                  </div>
                )}
                
                <div className="flex flex-col gap-2 mb-4">
                  <label className="text-xs font-bold text-[#8c92a4] uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-3 bg-[#0F111A] border border-white/5 rounded-lg text-[15px] text-white outline-none transition focus:border-[#00e5ff]/50 focus:ring-1 focus:ring-[#00e5ff]/30 placeholder:text-[#5e6376]" 
                    placeholder="Alex Walker" 
                  />
                </div>

                <div className="flex flex-col gap-2 mb-4">
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
                  <label className="text-xs font-bold text-[#8c92a4] uppercase tracking-wider">Choose Password</label>
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
                  Register Account
                </button>
              </form>
              <button 
                onClick={() => setShowEmailForm(false)}
                className="w-full text-center mt-6 text-[12px] text-[#5e6376] hover:text-white transition"
              >
                Go back to Google Registration
              </button>
            </div>
          )}
        </div>

        <div className="mt-10 text-center text-[13px] text-[#8c92a4] font-medium leading-relaxed">
          By signing up, you agree to our <a href="#" className="font-bold hover:text-white underline">Terms</a> and <a href="#" className="font-bold hover:text-white underline">Privacy Policy</a>
        </div>

        <div className="mt-6 text-center text-[13px] text-[#8c92a4] font-medium">
          Already have an account? <Link to="/login" className="text-[#00E5FF] font-bold hover:underline">Sign In</Link>
        </div>
      </div>
    </AuthLayout>
  );
}

