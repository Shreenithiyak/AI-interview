import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useSettings } from '../context/SettingsContext';

export default function Settings() {
  const {
    theme,
    setTheme,
    reminderEnabled,
    setReminderEnabled,
    reminderTime,
    setReminderTime,
    emailUpdates,
    setEmailUpdates
  } = useSettings();

  return (
    <DashboardLayout>
      <div className="py-8 max-w-[800px] mx-auto text-left">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white reading:text-[#433422] mb-8 tracking-tight transition-colors duration-300">
          Settings & Preferences
        </h1>

        <div className="flex flex-col gap-6">
          
          {/* Theme Preference Panel */}
          <div className="bg-white dark:bg-[#1C1F2E] reading:bg-[#fcf6e8] rounded-3xl p-8 border border-slate-200 dark:border-white/5 reading:border-[#433422]/12 shadow-lg transition-colors duration-300">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white reading:text-[#433422] mb-2 flex items-center gap-3">
              <img src="https://img.icons8.com/ios-filled/50/00e5ff/sun.png" alt="Theme" className="w-5 h-5 object-contain reading:brightness-50" />
              Theme Preference
            </h2>
            <p className="text-sm text-slate-500 dark:text-[#7b654a] reading:text-[#7b654a] mb-6">Choose how the application workspace looks to you.</p>
            
            <div className="flex flex-col sm:flex-row bg-slate-50 dark:bg-[#171923] reading:bg-[#f2e7d3] p-1.5 rounded-2xl w-full sm:w-[480px] border border-slate-200 dark:border-white/5 reading:border-[#433422]/12">
              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                  theme === 'dark' 
                    ? 'bg-[#00cbe5] dark:bg-[#00e5ff] reading:bg-[#b25e00] text-white dark:text-[#0f111a] shadow-[0_0_15px_rgba(0,229,255,0.15)]' 
                    : 'text-slate-550 dark:text-[#8c92a4] reading:text-[#7b654a] hover:text-slate-800 dark:hover:text-white reading:hover:text-[#433422]'
                }`}
              >
                <img 
                  src="https://img.icons8.com/ios-filled/50/moon.png" 
                  alt="Dark Mode" 
                  className={`w-4 h-4 object-contain ${theme === 'dark' ? 'invert' : ''}`}
                />
                Dark Theme
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                  theme === 'light' 
                    ? 'bg-[#00cbe5] dark:bg-[#00e5ff] reading:bg-[#b25e00] text-white dark:text-[#0f111a] shadow-[0_0_15px_rgba(0,229,255,0.15)]' 
                    : 'text-slate-550 dark:text-[#8c92a4] reading:text-[#7b654a] hover:text-slate-800 dark:hover:text-white reading:hover:text-[#433422]'
                }`}
              >
                <img 
                  src="https://img.icons8.com/ios-filled/50/sun.png" 
                  alt="Light Mode" 
                  className={`w-4 h-4 object-contain ${theme === 'light' ? '' : 'invert'}`}
                />
                Light Theme
              </button>
              <button
                onClick={() => setTheme('reading')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                  theme === 'reading' 
                    ? 'bg-[#00cbe5] dark:bg-[#00e5ff] reading:bg-[#b25e00] text-white dark:text-[#0f111a] reading:text-white shadow-[0_0_15px_rgba(0,229,255,0.15)]' 
                    : 'text-slate-550 dark:text-[#8c92a4] reading:text-[#7b654a] hover:text-slate-800 dark:hover:text-white reading:hover:text-[#433422]'
                }`}
              >
                <img 
                  src="https://img.icons8.com/ios-filled/50/shield.png" 
                  alt="Eye Shield" 
                  className={`w-4 h-4 object-contain ${theme === 'reading' ? 'invert' : ''}`}
                />
                Eye Shield
              </button>
            </div>
          </div>

          {/* Daily Reminder Panel */}
          <div className="bg-white dark:bg-[#1C1F2E] reading:bg-[#fcf6e8] rounded-3xl p-8 border border-slate-200 dark:border-white/5 reading:border-[#433422]/12 shadow-lg transition-colors duration-300">
            <div className="flex justify-between items-start gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-880 dark:text-white reading:text-[#433422] mb-2 flex items-center gap-3">
                  <img src="https://img.icons8.com/ios-filled/50/00e5ff/alarm-clock.png" alt="Reminder" className="w-5 h-5 object-contain reading:brightness-50" />
                  Notification Reminders
                </h2>
                <p className="text-sm text-slate-500 dark:text-[#7b654a] reading:text-[#7b654a]">Get reminded daily to keep up your mock practice streaks.</p>
              </div>
              <button 
                onClick={() => setReminderEnabled(!reminderEnabled)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${
                  reminderEnabled ? 'bg-[#00cbe5] dark:bg-[#00e5ff] reading:bg-[#b25e00]' : 'bg-slate-200 dark:bg-[#171923] reading:bg-[#f2e7d3] border border-slate-300 dark:border-white/10 reading:border-[#433422]/12'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                  reminderEnabled ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {reminderEnabled && (
              <div className="bg-slate-50 dark:bg-[#171923] reading:bg-[#f2e7d3] rounded-2xl p-6 border border-slate-200 dark:border-white/5 reading:border-[#433422]/12 mt-4 transition-all duration-300 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 dark:text-white reading:text-[#433422] mb-1">Set Daily Practice Time</label>
                    <span className="text-xs text-slate-500 dark:text-[#7b654a] reading:text-[#7b654a]">Choose a time when you are most focused.</span>
                  </div>
                  <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="bg-white dark:bg-[#1C1F2E] reading:bg-[#fcf6e8] border border-slate-350 dark:border-white/10 reading:border-[#433422]/20 text-slate-900 dark:text-white reading:text-[#433422] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#00cbe5] dark:focus:border-[#00e5ff] reading:focus:border-[#b25e00] transition-all font-semibold"
                  />
                </div>
                <div className="mt-4 text-xs font-medium text-[#00cbe5] dark:text-[#00e5ff] reading:text-[#b25e00] bg-[#00cbe5]/5 dark:bg-[#00e5ff]/5 reading:bg-[#b25e00]/5 px-4 py-2 rounded-lg border border-[#00cbe5]/10 dark:border-[#00e5ff]/10 reading:border-[#b25e00]/10">
                  Notification Active: We'll remind you daily to practice at {reminderTime}.
                </div>
              </div>
            )}
          </div>

          {/* Email Updates Panel */}
          <div className="bg-white dark:bg-[#1C1F2E] reading:bg-[#fcf6e8] rounded-3xl p-8 border border-slate-200 dark:border-white/5 reading:border-[#433422]/12 shadow-lg transition-colors duration-300">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-880 dark:text-white reading:text-[#433422] mb-2 flex items-center gap-3">
                  <img src="https://img.icons8.com/ios-filled/50/00e5ff/new-post.png" alt="Email" className="w-5 h-5 object-contain reading:brightness-50" />
                  Email Updates
                </h2>
                <p className="text-sm text-slate-500 dark:text-[#7b654a] reading:text-[#7b654a] max-w-md">Receive news on new technical focus roles, question sets, and monthly performance reviews.</p>
              </div>
              <button 
                onClick={() => setEmailUpdates(!emailUpdates)}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${
                  emailUpdates ? 'bg-[#00cbe5] dark:bg-[#00e5ff] reading:bg-[#b25e00]' : 'bg-slate-200 dark:bg-[#171923] reading:bg-[#f2e7d3] border border-slate-350 dark:border-white/10 reading:border-[#433422]/12'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                  emailUpdates ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
