export default function AuthLayout({ children }) {

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#11141D] text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,229,255,0.05)_0%,_transparent_50%)] pointer-events-none" />
      
      {/* Navbar area */}
      <nav className="relative flex justify-between items-center px-6 lg:px-12 py-6 w-full z-10 max-w-[1440px] mx-auto">
        <span className="text-xl font-bold text-[#00E5FF] tracking-tight">
          INTERVIEW-READY
        </span>
        <div className="text-sm font-medium text-[#8c92a4] hidden sm:block">
          Ready to level up today?
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 w-full max-w-[1300px] mx-auto px-6 lg:px-12 py-8 z-10">
        
        {/* Left Column: Hero/Info */}
        <div className="w-full lg:w-1/2 flex flex-col lg:pr-8">
          <h1 className="text-5xl lg:text-[-2px] tracking-tight font-extrabold text-white leading-[1.1] mb-6 drop-shadow-sm" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)'}}>
            Confidence starts<br/>with the first<br/><span className="text-[#00E5FF]">practice round.</span>
          </h1>
          <p className="text-lg text-[#8c92a4] mb-12 max-w-md leading-relaxed">
            Master the art of the interview with real-time feedback and structured learning paths tailored to your level.
          </p>

          {/* Graphics area */}
          <div className="relative">
            {/* Top Card: Authoritative Architect */}
            <div className="bg-[#1C1F2E] rounded-[1.25rem] shadow-[0_8px_30px_rgb(0,0,0,0.3)] p-6 max-w-md relative z-10 flex gap-4 overflow-hidden border border-white/5">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00E5FF]" /> {/* Cyan accent line */}
              <div className="w-12 h-12 bg-[#252839] rounded-xl flex items-center justify-center shrink-0 border border-white/5">
                <img src="https://img.icons8.com/ios-filled/50/00e5ff/user-group-man-man.png" alt="Icon" className="w-6 h-6 object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">The Authoritative Architect</h3>
                <p className="text-[13px] text-[#8c92a4] italic mb-4 leading-relaxed">
                  "Practice doesn't make perfect; perfect practice makes perfect. Let's analyze your structural response to behavioral questions."
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full flex gap-1.5 overflow-hidden">
                    <div className="h-full bg-[#00E5FF] rounded-full" style={{width: '35%'}}></div>
                    <div className="h-full bg-[#00E5FF]/50 rounded-full" style={{width: '30%'}}></div>
                    <div className="h-full bg-[#00E5FF]/20 rounded-full" style={{width: '35%'}}></div>
                  </div>
                  <span className="text-[11px] font-bold text-[#00E5FF]">75% Ready</span>
                </div>
              </div>
            </div>

            {/* Bottom Graphic: Mentor Monitor (Stylized) */}
            <div className="mt-[-28px] bg-gradient-to-b from-[#1C1F2E] to-[#11141D] rounded-2xl relative h-[200px] max-w-md shadow-lg flex flex-col items-center overflow-hidden border border-white/5 opacity-80 mix-blend-lighten">
              {/* Inner screen bezel */}
              <div className="absolute top-2 left-2 right-2 bottom-6 rounded-xl bg-[#0F111A] border border-white/10">
                 {/* Screen display */}
                <div className="absolute inset-1 rounded-lg bg-gradient-to-br from-[#1C1F2E] to-[#0F111A] flex flex-col items-center justify-center border border-white/5">
                  <span className="text-3xl font-extrabold text-[#00E5FF] uppercase tracking-[0.2em] drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]">Mentor</span>
                </div>
              </div>
              {/* Stand pillar */}
              <div className="absolute bottom-1 w-12 h-6 bg-gradient-to-b from-[#1C1F2E] to-[#0F111A]" />
              {/* Stand base */}
              <div className="absolute bottom-0 w-32 h-2 bg-[#252839] rounded-t-lg" />
            </div>
          </div>
        </div>

        {/* Right Column: Auth Form */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          {children}
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center text-[11px] uppercase tracking-wide text-[#5e6376] w-full max-w-[1440px] mx-auto mt-auto bg-transparent">
        <div className="mb-4 md:mb-0 font-bold">© 2024 INTERVIEW-READY. All Rights Reserved.</div>
        <div className="flex gap-8 mb-4 md:mb-0">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
          <a href="#" className="hover:text-white transition">Help Center</a>
        </div>
      </footer>
    </div>
  );
}
