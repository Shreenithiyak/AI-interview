import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="flex justify-between items-center px-8 lg:px-12 py-5 bg-[#0F111A] border-b border-white/5 sticky top-0 z-50 w-full">
      <div className="flex items-center gap-12 max-w-[1440px] mx-auto w-full justify-between">
        
        <div className="flex items-center gap-12">
          {/* Brand / Logo */}
          <span className="text-xl font-bold tracking-tight text-[#00E5FF]">
            INTERVIEW-READY
          </span>
          
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <Link to="/" className={`relative transition-all ${location.pathname === '/' ? 'text-[#00e5ff]' : 'text-[#8c92a4] hover:text-white'}`}>
              Home
              {location.pathname === '/' && <div className="absolute -bottom-[23px] left-0 right-0 h-[2px] bg-[#00e5ff]" />}
            </Link>
            <Link to="/landing-simulator" className={`relative transition-all ${location.pathname === '/landing-simulator' ? 'text-[#00e5ff]' : 'text-[#8c92a4] hover:text-white'}`}>
              Simulator
              {location.pathname === '/landing-simulator' && <div className="absolute -bottom-[23px] left-0 right-0 h-[2px] bg-[#00e5ff]" />}
            </Link>


          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/login" className="hidden sm:flex text-sm font-semibold text-white hover:text-[#00e5ff] transition-colors">
            Log In
          </Link>
          <Link to="/register" className="px-5 py-2.5 bg-white text-[#0f111a] hover:bg-slate-200 text-sm font-bold rounded-lg transition-colors">
            Sign Up Free
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0F111A] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1C1F2E] via-[#0F111A] to-[#0F111A] pointer-events-none" />
      <Navbar />
      <main className="flex-1 w-full max-w-[1440px] mx-auto relative z-10">
        {children}
      </main>
      <footer className="w-full px-8 lg:px-12 py-10 flex flex-col md:flex-row justify-between items-center text-[11px] uppercase tracking-wide text-[#5e6376] bg-[#0a0c12] border-t border-white/5 relative z-10">
        <div className="mb-4 md:mb-0 font-bold">© 2024 INTERVIEW-READY. All Rights Reserved.</div>
        <div className="flex gap-8 mb-4 md:mb-0">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <a href="#" className="hover:text-white transition">Help Center</a>
          <a href="#" className="hover:text-white transition">Feedback</a>
        </div>
      </footer>
    </div>
  );
}
