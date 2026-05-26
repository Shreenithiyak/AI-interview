import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { reminderEnabled, reminderTime } = useSettings();
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format time (e.g. 18:00 to 6:00 PM)
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHours = h % 12 || 12;
    return `${displayHours}:${minutes} ${ampm}`;
  };

  const notifications = [];
  if (reminderEnabled) {
    notifications.push({
      id: 1,
      title: "Daily Practice Reminder",
      message: `Practice daily at ${formatTime(reminderTime)}! Keep your interview readiness streak alive.`,
      time: `Today, ${formatTime(reminderTime)}`,
      type: "reminder"
    });
    notifications.push({
      id: 2,
      title: "Practice Reminder",
      message: `Remember to run through a quick 15-minute mock simulation.`,
      time: `Yesterday, ${formatTime(reminderTime)}`,
      type: "reminder"
    });
  } else {
    notifications.push({
      id: 3,
      title: "Reminders Disabled",
      message: "Enable daily practice reminders in Settings to maintain a solid prep routine.",
      time: "Just now",
      type: "info"
    });
  }

  notifications.push({
    id: 4,
    title: "Welcome to Interview Ready",
    message: "Start by selecting a targeted MNC or specific tech stack on the practice page.",
    time: "2 days ago",
    type: "info"
  });

  return (
    <nav className="flex justify-between items-center px-8 lg:px-12 py-5 bg-white dark:bg-[#0F111A] reading:bg-[#eadbbf] border-b border-slate-200 dark:border-white/5 reading:border-[#433422]/15 sticky top-0 z-50 transition-colors duration-300">

      {/* Brand / Logo */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold tracking-tight text-[#00cbe5] dark:text-[#00E5FF] reading:text-[#b25e00]">
          INTERVIEW-READY
        </span>
      </div>

      {/* Center Nav Items */}
      <div className="hidden md:flex items-center gap-8 pl-12 flex-1">
        <NavLink
          to="/dashboard"
          className={() =>
            `text-sm font-medium transition-all relative ${location.pathname === '/dashboard' ? 'text-[#00cbe5] dark:text-[#00e5ff] reading:text-[#b25e00]' : 'text-slate-550 dark:text-[#8c92a4] reading:text-[#7b654a] hover:text-slate-800 dark:hover:text-white reading:hover:text-[#433422]'}`
          }
        >
          Dashboard
          {location.pathname === '/dashboard' && (
            <div className="absolute -bottom-[23px] left-0 right-0 h-[2px] bg-[#00cbe5] dark:bg-[#00e5ff] reading:bg-[#b25e00]" />
          )}
        </NavLink>
        <NavLink
          to="/practice"
          className={() =>
            `text-sm font-medium transition-all relative ${location.pathname.startsWith('/practice') || location.pathname.startsWith('/questions') ? 'text-[#00cbe5] dark:text-[#00e5ff] reading:text-[#b25e00]' : 'text-slate-550 dark:text-[#8c92a4] reading:text-[#7b654a] hover:text-slate-800 dark:hover:text-white reading:hover:text-[#433422]'}`
          }
        >
          Practice
          {(location.pathname.startsWith('/practice') || location.pathname.startsWith('/questions')) && (
            <div className="absolute -bottom-[23px] left-0 right-0 h-[2px] bg-[#00cbe5] dark:bg-[#00e5ff] reading:bg-[#b25e00]" />
          )}
        </NavLink>
        <NavLink
          to="/analytics"
          className={() =>
            `text-sm font-medium transition-all relative ${location.pathname.startsWith('/analytics') ? 'text-[#00cbe5] dark:text-[#00e5ff] reading:text-[#b25e00]' : 'text-slate-550 dark:text-[#8c92a4] reading:text-[#7b654a] hover:text-slate-800 dark:hover:text-white reading:hover:text-[#433422]'}`
          }
        >
          Analytics
          {location.pathname.startsWith('/analytics') && (
            <div className="absolute -bottom-[23px] left-0 right-0 h-[2px] bg-[#00cbe5] dark:bg-[#00e5ff] reading:bg-[#b25e00]" />
          )}
        </NavLink>

      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6 relative" ref={dropdownRef}>
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="text-slate-550 dark:text-[#8c92a4] reading:text-[#7b654a] hover:text-slate-800 dark:hover:text-white reading:hover:text-[#433422] transition-colors relative"
        >
          <img src="https://img.icons8.com/ios-filled/50/8c92a4/bell.png" alt="Notifications" className="w-5 h-5 object-contain hover:brightness-200 transition-all dark:brightness-100 dark:contrast-100 reading:brightness-50" />
          <div className="absolute top-0 right-1 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#0F111A] reading:border-[#eadbbf]"></div>
        </button>

        {showNotifications && (
          <div className="absolute right-16 top-10 w-80 bg-white dark:bg-[#1C1F2E] reading:bg-[#fcf6e8] border border-slate-200 dark:border-white/5 reading:border-[#433422]/12 rounded-2xl shadow-xl z-50 p-4 transition-colors duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 reading:border-[#433422]/10 pb-3 mb-3">
              <span className="text-sm font-bold text-slate-850 dark:text-white reading:text-[#433422]">Notifications</span>
              <span className="text-[10px] text-[#00cbe5] dark:text-[#00e5ff] reading:text-[#b25e00] uppercase tracking-wider font-bold bg-[#00e5ff]/5 reading:bg-[#b25e00]/5 px-2 py-0.5 rounded">Reminders</span>
            </div>
            <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-3 bg-slate-50 dark:bg-[#171923] reading:bg-[#f2e7d3] border border-slate-100 dark:border-white/5 reading:border-[#433422]/10 rounded-xl flex gap-3 hover:bg-slate-100 dark:hover:bg-[#202332] reading:hover:bg-[#eadbbf] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#00cbe5] dark:bg-[#00e5ff] reading:bg-[#b25e00] mt-1.5 shrink-0" />
                  <div className="text-left">
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white reading:text-[#433422] mb-0.5">{notif.title}</h4>
                    <p className="text-[11px] text-slate-600 dark:text-[#8c92a4] reading:text-[#7b654a] leading-relaxed mb-1">{notif.message}</p>
                    <span className="text-[9px] text-slate-400 dark:text-[#5e6376] reading:text-[#8b7355] font-medium">{notif.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Link to="/settings" className="text-slate-550 dark:text-[#8c92a4] reading:text-[#7b654a] hover:text-slate-800 dark:hover:text-white reading:hover:text-[#433422] transition-colors">
          <img src="https://img.icons8.com/ios-filled/50/8c92a4/settings.png" alt="Settings" className="w-5 h-5 object-contain hover:brightness-200 transition-all dark:brightness-100 reading:brightness-50" />
        </Link>
        <Link to="/profile" className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/20 reading:border-[#433422]/15 hover:border-[#00cbe5] dark:hover:border-[#00e5ff] reading:hover:border-[#b25e00] transition-all ml-4 flex items-center justify-center bg-slate-50 dark:bg-[#171923] reading:bg-[#f2e7d3] text-[#00cbe5] dark:text-[#00e5ff] reading:text-[#b25e00] font-bold text-sm shadow-sm" title="View Profile">
          {user?.name?.charAt(0) || 'U'}
        </Link>
      </div>

    </nav>
  );
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F4F6FA] dark:bg-[#11141D] reading:bg-[#f7efe2] text-slate-850 dark:text-slate-200 reading:text-[#433422] font-sans flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-6 py-12">
        {children}
      </main>

      {/* Footer from image */}
      <footer className="w-full max-w-[1280px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-[11px] font-medium text-slate-400 dark:text-[#5e6376] reading:text-[#8b7355] mt-auto uppercase tracking-wide border-t border-slate-200 dark:border-transparent reading:border-[#433422]/10">
        <div>© 2024 INTERVIEW-READY. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="hover:text-slate-800 dark:hover:text-white reading:hover:text-[#433422] transition">Privacy Policy</a>
          <a href="#" className="hover:text-slate-800 dark:hover:text-white reading:hover:text-[#433422] transition">Terms of Service</a>
          <a href="#" className="hover:text-slate-800 dark:hover:text-white reading:hover:text-[#433422] transition">Help Center</a>
          <a href="#" className="hover:text-slate-800 dark:hover:text-white reading:hover:text-[#433422] transition">Feedback</a>
        </div>
      </footer>
    </div>
  );
}
