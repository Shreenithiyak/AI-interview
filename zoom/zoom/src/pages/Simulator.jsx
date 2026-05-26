import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaStop, FaFastForward, FaRedoAlt, FaMicrophone } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { useVoiceInterview } from '../hooks/useVoiceInterview';

export default function Simulator() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { reminderEnabled, reminderTime } = useSettings();
  
  const [confidence, setConfidence] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  
  // Get question from state or use default if navigated directly
  const displayQuestion = location.state?.selectedQuestion || "Tell me about a time you solved a complex technical problem.";

  const {
    isRecording,
    isProcessing,
    isSpeaking,
    transcript,
    aiAudioUrl,
    startRecording,
    stopRecording,
    restartInterview
  } = useVoiceInterview(displayQuestion);

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

  const handleRestart = () => {
    restartInterview();
    setConfidence(0);
  };

  const handleSkip = () => {
    navigate('/questions');
  };

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
    <div className="min-h-screen bg-[#F4F6FA] dark:bg-[#11141D] reading:bg-[#f7efe2] text-slate-850 dark:text-white reading:text-[#433422] font-sans flex flex-col transition-colors duration-300">
      
      {/* Top Navbar matching DashboardLayout exactly */}
      <nav className="flex justify-between items-center px-8 lg:px-12 py-5 bg-[#0F111A] reading:bg-[#eadbbf] border-b border-white/5 reading:border-[#433422]/15 sticky top-0 z-50 transition-colors duration-300">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-[#00cbe5] dark:text-[#00E5FF] reading:text-[#b25e00]">
            INTERVIEW-READY
          </span>
        </div>

        {/* Center Nav Items */}
        <div className="hidden md:flex items-center gap-8 pl-12 flex-1 text-left">
          <Link 
            to="/dashboard" 
            className="text-sm font-medium transition-all relative text-slate-550 dark:text-[#8c92a4] reading:text-[#7b654a] hover:text-slate-800 dark:hover:text-white reading:hover:text-[#433422]"
          >
            Dashboard
          </Link>
          <Link 
            to="/practice" 
            className="relative text-sm font-medium transition-all text-[#00cbe5] dark:text-[#00e5ff] reading:text-[#b25e00]"
          >
            Practice
            <div className="absolute -bottom-[23px] left-0 right-0 h-[2px] bg-[#00cbe5] dark:bg-[#00e5ff] reading:bg-[#b25e00]" />
          </Link>
          <Link 
            to="/analytics" 
            className="text-sm font-medium transition-all relative text-slate-550 dark:text-[#8c92a4] reading:text-[#7b654a] hover:text-slate-800 dark:hover:text-white reading:hover:text-[#433422]"
          >
            Analytics
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6 relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-slate-555 dark:text-[#8c92a4] reading:text-[#7b654a] hover:text-slate-800 dark:hover:text-white reading:hover:text-[#433422] transition-colors relative"
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

      {/* Main Form Content */}
      <div className="flex-1 max-w-[1400px] mx-auto w-full p-6 lg:p-8 flex flex-col gap-8 pb-20 text-left">
        
        {/* Videos Row (Top) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:min-h-[500px]">
          {/* AI Mentor Video Feed */}
          <div className="relative rounded-[2rem] overflow-hidden bg-white dark:bg-[#1C1F2E] reading:bg-[#fcf6e8] border border-slate-200 dark:border-white/5 reading:border-[#433422]/12 shadow-xl group flex flex-col items-center justify-center min-h-[350px] transition-colors duration-300">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" alt="AI Mentor" className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-200/50 dark:from-[#11141D]/90 via-transparent to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-6 left-6 right-6 lg:right-1/4 bg-white/80 dark:bg-[#1C1F2E]/80 reading:bg-[#fcf6e8]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 reading:border-[#433422]/12 rounded-2xl p-5 shadow-lg transition-colors duration-300">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse"></div>
                <span className="text-[10px] font-bold tracking-[0.15em] text-slate-500 dark:text-[#8c92a4] reading:text-[#7b654a] uppercase">AI Interaction Live</span>
              </div>
              <h2 className="text-xl md:text-[22px] font-extrabold text-slate-850 dark:text-white reading:text-[#433422] tracking-tight transition-colors duration-300">Sarah, Senior Technical Lead</h2>
            </div>
          </div>

          {/* User Camera Placeholder (No real Image) */}
          <div className="relative rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-[#151824] reading:bg-[#f2e7d3] border border-slate-200 dark:border-white/5 reading:border-[#433422]/12 shadow-xl min-h-[350px] flex items-center justify-center transition-colors duration-300">
            <div className="flex flex-col items-center gap-6">
               <div className="w-32 h-32 rounded-full bg-white dark:bg-[#1C1F2E] reading:bg-[#fcf6e8] border-2 border-[#00cbe5]/20 dark:border-[#00e5ff]/20 reading:border-[#b25e00]/20 flex items-center justify-center text-5xl font-bold text-[#00cbe5] dark:text-[#00e5ff] reading:text-[#b25e00] shadow-[0_0_40px_rgba(0,229,255,0.05)] transition-colors duration-300">
                 {user?.name?.charAt(0).toUpperCase() || 'U'}
               </div>
               <div className="text-slate-500 dark:text-[#8c92a4] reading:text-[#7b654a] text-sm font-medium tracking-widest uppercase transition-colors">Camera Feed Active</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-200/50 dark:from-[#11141D]/90 via-transparent to-transparent pointer-events-none"></div>
            
            <div className={`absolute top-6 left-6 bg-white/85 dark:bg-[#11141D]/85 reading:bg-[#fcf6e8]/85 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 reading:border-[#433422]/12 flex items-center gap-2 shadow-sm transition-colors duration-300 ${isRecording ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-[#ef4444] shadow-[0_0_8px_#ef4444] animate-pulse' : 'bg-slate-400'}`}></div>
              <span className="text-xs font-bold tracking-widest text-slate-700 dark:text-[#e2e8f0] reading:text-[#433422]">{isRecording ? 'REC ACTIVE' : 'REC PAUSED'}</span>
            </div>

            <div className="absolute bottom-6 left-6 px-5 py-2.5 bg-white/80 dark:bg-[#1C1F2E]/80 reading:bg-[#fcf6e8]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 reading:border-[#433422]/12 rounded-full font-bold text-sm text-slate-800 dark:text-white reading:text-[#433422] shadow-lg transition-colors duration-300">
              You ({user?.name || 'User'})
            </div>
          </div>
        </div>

        {/* Info & Controls Row (Bottom) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
          
          {/* Question & Transcription */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1C1F2E] reading:bg-[#fcf6e8] rounded-3xl p-8 border border-slate-200 dark:border-white/5 reading:border-[#433422]/12 flex flex-col shadow-xl transition-colors duration-300">
            <div className="mb-8 pl-1">
              <div className="text-[11px] font-bold tracking-[0.2em] text-[#00cbe5] dark:text-[#00E5FF] reading:text-[#b25e00] uppercase mb-4">Current Question</div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white reading:text-[#433422] leading-[1.3] tracking-tight transition-colors duration-300">
                "{displayQuestion}"
              </h3>
            </div>
            
            <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#171923] dark:to-[#12151f] reading:bg-[#f2e7d3] border border-[#00cbe5]/20 dark:border-[#00e5ff]/20 reading:border-[#b25e00]/20 relative rounded-2xl p-7 shadow-inner transition-all duration-300">
              <div className="text-[10px] font-bold tracking-[0.15em] text-slate-400 dark:text-[#8c92a4] reading:text-[#7b654a] uppercase mb-5">Real-Time Transcription</div>
              <p className={`text-lg leading-[1.8] font-medium tracking-wide italic transition-colors ${isProcessing ? 'text-slate-400 animate-pulse' : 'text-slate-700 dark:text-[#e2e8f0] reading:text-[#433422]'}`}>
                "{transcript}"
              </p>
              {(isRecording || isProcessing) && (
                <div className="mt-4 flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-[#00cbe5] dark:bg-[#00E5FF] reading:bg-[#b25e00] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#00cbe5] dark:bg-[#00E5FF] reading:bg-[#b25e00] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#00cbe5] dark:bg-[#00E5FF] reading:bg-[#b25e00] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              )}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="bg-white dark:bg-[#1C1F2E] reading:bg-[#fcf6e8] rounded-3xl p-8 border border-slate-200 dark:border-white/5 reading:border-[#433422]/12 shadow-xl flex flex-col justify-between transition-colors duration-300">
            <div>
              <h4 className="text-2xl font-bold text-slate-880 dark:text-white reading:text-[#433422] mb-3 tracking-tight transition-colors">Simulator Controls</h4>
              <p className="text-sm text-slate-500 dark:text-[#8c92a4] reading:text-[#7b654a] leading-relaxed mb-10 transition-colors">
                Maintain eye contact with the camera for better engagement score.
              </p>

              {isRecording ? (
                <button 
                  onClick={stopRecording}
                  disabled={isProcessing}
                  className="w-full bg-[#ef4444] hover:bg-[#dc2626] disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-[0_0_20px_rgba(239,68,68,0.2)] mb-5 active:scale-[0.98]"
                >
                  <FaStop className="w-[18px] h-[18px]" />
                  <span className="text-[15px]">Stop Recording</span>
                </button>
              ) : isSpeaking ? (
                <button
                  disabled
                  className="w-full bg-[#8b5cf6] opacity-80 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 mb-5 cursor-not-allowed"
                >
                  <span className="flex gap-1 items-center">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                  </span>
                  <span className="text-[15px]">AI is Speaking...</span>
                </button>
              ) : (
                <button 
                  onClick={startRecording}
                  disabled={isProcessing}
                  className="w-full bg-[#10b981] hover:bg-[#059669] disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)] mb-5 active:scale-[0.98]"
                >
                  <FaMicrophone className="w-[18px] h-[18px]" />
                  <span className="text-[15px]">Start Recording</span>
                </button>
              )}

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleSkip}
                  className="bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 reading:hover:bg-[#eadbbf] border-[1.5px] border-slate-250 dark:border-white/10 reading:border-[#433422]/20 text-slate-880 dark:text-white reading:text-[#433422] font-bold py-3.5 rounded-xl flex items-center justify-center gap-2.5 transition-colors active:scale-[0.98]"
                >
                  <FaFastForward className="w-[14px] h-[14px]" />
                  <span className="text-[15px]">Skip</span>
                </button>
                <button 
                  onClick={handleRestart}
                  className="bg-[#0055ff] hover:bg-[#004ade] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2.5 transition-colors shadow-[0_0_15px_rgba(0,85,255,0.25)] active:scale-[0.98]"
                >
                  <FaRedoAlt className="w-[14px] h-[14px]" />
                  <span className="text-[15px]">Restart</span>
                </button>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-slate-200 dark:border-white/5 reading:border-[#433422]/12">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-bold tracking-[0.1em] text-slate-500 dark:text-[#8c92a4] reading:text-[#7b654a] uppercase">Confidence Score</span>
                <span className="text-[15px] font-bold text-slate-800 dark:text-white reading:text-[#433422] transition-colors">{confidence}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-[#171923] reading:bg-[#f2e7d3] rounded-full overflow-hidden border border-slate-200 dark:border-white/5 reading:border-[#433422]/12 transition-colors">
                <div className="h-full bg-gradient-to-r from-[#10b981] to-[#34d399] rounded-full shadow-[0_0_10px_#10b981]" style={{ width: `${confidence}%` }}></div>
              </div>
            </div>
          </div>

        </div>

        {/* Hidden Audio Element for AI TTS */}
        {aiAudioUrl && (
          <audio src={aiAudioUrl} autoPlay onEnded={() => console.log('AI finished speaking')} />
        )}

      </div>
    </div>
  );
}
