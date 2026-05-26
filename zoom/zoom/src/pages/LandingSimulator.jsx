import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiX, FiMic, FiSliders } from 'react-icons/fi';
import Layout from '../layouts/Layout';

export default function LandingSimulator() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#11141D] text-white w-full overflow-x-hidden font-sans border-t border-white/5">
        <div className="max-w-[800px] mx-auto pt-16 pb-32 relative h-full flex flex-col items-center">
          
          {/* Header Status */}
          <div className="text-center font-bold tracking-[0.2em] text-[#00E5FF] text-[11px] uppercase mb-12 animate-pulse">
            INTERACTIVE AI DEMO
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center mb-12">
            <div className="w-[120px] h-[120px] rounded-full p-[2px] bg-gradient-to-tr from-[#00E5FF] via-[#7B2CBF] to-[#00E5FF] mb-4 shadow-[0_0_40px_rgba(0,229,255,0.2)]">
              <div className="w-full h-full rounded-full bg-[#1C1F2E] overflow-hidden border-[3px] border-[#11141D]">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="AI Mentor" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00e5ff] animate-pulse"></div>
              <span className="text-white font-bold text-[18px]">Neon AI Guide</span>
            </div>
          </div>

          {/* AI Chat Bubble */}
          <div className="w-full mb-10 pl-6">
            <div className="bg-[#1C1F2E] border border-white/5 rounded-2xl rounded-tl-sm p-6 text-[#e2e8f0] text-[18px] leading-[1.6] max-w-[85%] shadow-lg">
              Welcome to the Neon AI experience. During a real session, I will adapt dynamically to your role and experience level, offering real-time guidance to ensure you ace your next interview. <br/><br/>
              Ready to try the real thing? Check out the Question Bank.
            </div>
            <div className="text-[10px] text-[#738299] font-bold tracking-[0.1em] uppercase mt-3 ml-2">
              AI MENTOR • JUST NOW
            </div>
          </div>

          {/* Real-time coaching preview */}
          <div className="bg-[#161B28] rounded-xl border border-white/5 border-l-[3px] border-l-[#00E5FF] p-6 mb-12 w-[90%] md:w-[80%] self-start ml-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#00E5FF]/5 to-transparent pointer-events-none"></div>
            <div className="flex items-center gap-2 mb-3 relative z-10">
              <FiStar className="w-4 h-4 text-[#00E5FF] fill-[#00E5FF]" />
              <span className="text-[11px] font-bold text-[#e2e8f0] tracking-widest uppercase">PREVIEW: REAL-TIME COACHING</span>
            </div>
            <div className="text-[#8c92a4] text-[15px] italic leading-[1.6] relative z-10">
              In an actual mock interview, you'll receive personalized cues here—like reminders to use the STAR method or subtle hints if your answer veers off-topic.
            </div>
          </div>

          {/* FIXED Bottom Control Bar */}
          <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center pb-8 pt-12 bg-gradient-to-t from-[#11141D] via-[#11141D] to-transparent pointer-events-none">
            
            <div className="bg-[#1C1F2E] rounded-full h-[84px] w-[90%] max-w-[700px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between px-10 mb-6 backdrop-blur-xl pointer-events-auto transition-transform hover:scale-[1.02]">
              
              {/* Finish Session / Close - Left */}
              <Link to="/" className="text-[#738299] hover:text-[#ef4444] transition-colors p-2 rounded-full hover:bg-white/5 flex items-center justify-center">
                <FiX className="w-6 h-6" />
              </Link>
              
              {/* Audio Visualization & Mic */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-1.5 h-8">
                  <div className="w-1.5 bg-[#00E5FF]/30 h-4 rounded-full"></div>
                  <div className="w-1.5 bg-[#00E5FF]/60 h-8 rounded-full"></div>
                  <div className="w-1.5 bg-[#00E5FF]/40 h-5 rounded-full"></div>
                  <div className="w-1.5 bg-[#00E5FF]/80 h-6 rounded-full"></div>
                </div>
                
                {/* Main Mic Button */}
                <div className="w-[72px] h-[72px] rounded-full bg-[#00E5FF] shadow-[0_0_30px_rgba(0,229,255,0.4)] flex items-center justify-center cursor-pointer hover:bg-[#00cbe5] hover:scale-105 transition-all">
                  <FiMic className="w-7 h-7 text-[#0f111a]" />
                </div>
                
                <div className="flex items-center gap-1.5 h-8">
                  <div className="w-1.5 bg-[#00E5FF]/80 h-6 rounded-full"></div>
                  <div className="w-1.5 bg-[#00E5FF]/40 h-5 rounded-full"></div>
                  <div className="w-1.5 bg-[#00E5FF]/60 h-8 rounded-full"></div>
                  <div className="w-1.5 bg-[#00E5FF]/30 h-4 rounded-full"></div>
                </div>
              </div>

              {/* Options - Right */}
              <button className="text-[#738299] hover:text-white transition-colors p-2 rounded-full hover:bg-white/5 flex items-center justify-center">
                <FiSliders className="w-6 h-6" />
              </button>
            </div>
            
            {/* Helper Text */}
            <div className="text-[10px] font-bold tracking-[0.2em] text-[#475569] uppercase pointer-events-auto">
              TAP TO PAUSE • SPACEBAR TO TOGGLE MIC
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
