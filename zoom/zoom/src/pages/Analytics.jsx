import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoadingStep = ({ text, status }) => {
  return (
    <div className={`flex items-center gap-4 transition-all duration-500 ${status === 'pending' ? 'opacity-40' : 'opacity-100'}`}>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors duration-500
        ${status === 'completed' 
          ? 'border-[#00cbe5] dark:border-[#00e5ff] reading:border-[#b25e00] bg-[#00cbe5]/20 dark:bg-[#00e5ff]/20 reading:bg-[#b25e00]/20 text-[#00cbe5] dark:text-[#00e5ff] reading:text-[#b25e00]' 
          : status === 'active' 
            ? 'border-[#00cbe5] dark:border-[#00e5ff] reading:border-[#b25e00] border-t-transparent reading:border-t-transparent animate-spin' 
            : 'border-slate-300 dark:border-white/20 reading:border-[#433422]/20 bg-transparent'}`}
      >
        {status === 'completed' && (
          <img src="https://img.icons8.com/ios-filled/50/00e5ff/checkmark.png" alt="check" className="w-3 h-3 object-contain reading:brightness-50" />
        )}
      </div>
      <span className={`font-semibold tracking-wide ${status === 'completed' ? 'text-slate-900 dark:text-white reading:text-[#433422]' : status === 'active' ? 'text-[#00cbe5] dark:text-[#00e5ff] reading:text-[#b25e00]' : 'text-slate-400 dark:text-[#5e6376] reading:text-[#8b7355]'}`}>
        {text}
      </span>
    </div>
  );
};

export default function Analytics() {
  const [step, setStep] = useState(0);
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const hasUpdated = useRef(false);

  // 1. Immediately write history on mount so any navigation instantly has the remarks saved
  useEffect(() => {
    if (user && !hasUpdated.current) {
      hasUpdated.current = true;
      if (!user.history || user.history.length === 0) {
        updateUser({
          ...user,
          history: [
            { date: new Date().toLocaleDateString(), score: 92, title: 'System Design Mock' }
          ]
        });
      }
    }
  }, [user, updateUser]);

  // 2. Run the load step animation once on mount to avoid recalculation loops
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1500);
    const timer2 = setTimeout(() => setStep(2), 3500);
    const timer3 = setTimeout(() => setStep(3), 5500);
    const timer4 = setTimeout(() => setStep(4), 7500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-[800px] mx-auto text-center px-4">
        
        {step < 4 ? (
          <>
            {/* Pulsing Core */}
            <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#00cbe5] dark:bg-[#00E5FF] reading:bg-[#b25e00] rounded-full mix-blend-screen filter blur-2xl opacity-20 animate-pulse"></div>
              <div className="absolute inset-2 border-4 border-[#00cbe5]/20 dark:border-[#00E5FF]/20 reading:border-[#b25e00]/20 border-t-[#00cbe5] dark:border-t-[#00E5FF] reading:border-t-[#b25e00] rounded-full animate-spin shadow-[0_0_15px_#00cbe5] dark:shadow-[0_0_15px_#00E5FF] reading:shadow-[0_0_15px_#b25e00]"></div>
              <div className="absolute inset-6 border-4 border-[#00cbe5]/10 dark:border-[#00E5FF]/10 reading:border-[#b25e00]/10 border-b-[#00cbe5] dark:border-b-[#00E5FF] reading:border-b-[#b25e00] rounded-full animate-spin-slow"></div>
              <div className="w-10 h-10 bg-[#00cbe5] dark:bg-[#00E5FF] reading:bg-[#b25e00] rounded-full shadow-[0_0_30px_#00cbe5] dark:shadow-[0_0_30px_#00E5FF] reading:shadow-[0_0_30px_#b25e00] animate-pulse"></div>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white reading:text-[#433422] mb-4 tracking-tight">
              Analyzing Your Performance
            </h1>
            <p className="text-slate-500 dark:text-[#8c92a4] reading:text-[#7b654a] mb-12 max-w-lg mx-auto text-lg leading-relaxed">
              Neon AI is transcribing your session and running advanced diagnostics on your logic, tone, and technical accuracy.
            </p>

            <div className="flex flex-col gap-5 text-left w-full max-w-sm mx-auto bg-white dark:bg-[#1C1F2E] reading:bg-[#fcf6e8] p-8 rounded-3xl border border-slate-200 dark:border-white/5 reading:border-[#433422]/12 shadow-2xl">
              <LoadingStep 
                text="Transcribing Audio & Speech..." 
                status={step > 0 ? 'completed' : 'active'} 
              />
              <LoadingStep 
                text="Evaluating System Design..." 
                status={step > 1 ? 'completed' : step === 1 ? 'active' : 'pending'} 
              />
              <LoadingStep 
                text="Assessing Confidence & Tone..." 
                status={step > 2 ? 'completed' : step === 2 ? 'active' : 'pending'} 
              />
              <LoadingStep 
                text="Calculating Final Score..." 
                status={step > 3 ? 'completed' : step === 3 ? 'active' : 'pending'} 
              />
            </div>

            <button 
              onClick={() => navigate('/dashboard')}
              className="mt-8 text-sm font-bold text-[#00cbe5] dark:text-[#00E5FF] reading:text-[#b25e00] hover:underline transition-all cursor-pointer"
            >
              Skip & Go to Dashboard
            </button>
          </>
        ) : (
          <div className="animate-fade-in-up flex flex-col items-center">
            
            <div className="w-24 h-24 bg-[#00cbe5]/20 dark:bg-[#00e5ff]/20 reading:bg-[#b25e00]/20 rounded-full flex items-center justify-center mb-8 border-2 border-[#00cbe5] dark:border-[#00e5ff] reading:border-[#b25e00] shadow-[0_0_40px_rgba(0,203,229,0.4)] dark:shadow-[0_0_40px_rgba(0,229,255,0.4)] reading:shadow-[0_0_40px_rgba(178,94,0,0.4)] relative">
              <div className="absolute inset-0 bg-[#00cbe5] dark:bg-[#00E5FF] reading:bg-[#b25e00] rounded-full mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
              <img src="https://img.icons8.com/ios-filled/50/00e5ff/checkmark.png" alt="complete" className="w-12 h-12 relative z-10 object-contain reading:brightness-50" />
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white reading:text-[#433422] mb-6 tracking-tight">
              Analysis Complete!
            </h1>
            <p className="text-slate-500 dark:text-[#8c92a4] reading:text-[#7b654a] mb-10 text-xl font-medium">
              You scored an impressive <span className="text-[#00cbe5] dark:text-[#00E5FF] reading:text-[#b25e00] font-bold">92%</span> on architecture.
            </p>

            <Link to="/dashboard" className="inline-flex items-center justify-center px-10 py-4 bg-[#00cbe5] dark:bg-[#00E5FF] reading:bg-[#b25e00] text-white dark:text-[#0F111A] reading:text-white rounded-xl font-extrabold transition hover:bg-[#00b8d4] dark:hover:bg-[#00cbe5] reading:hover:bg-[#995100] hover:shadow-[0_0_30px_rgba(0,203,229,0.4)] dark:hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] reading:hover:shadow-[0_0_30px_rgba(178,94,0,0.4)] text-lg shadow-[0_0_20px_rgba(0,203,229,0.2)] dark:shadow-[0_0_20px_rgba(0,229,255,0.2)] reading:shadow-[0_0_20px_rgba(178,94,0,0.2)]">
              View Final Dashboard
            </Link>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
