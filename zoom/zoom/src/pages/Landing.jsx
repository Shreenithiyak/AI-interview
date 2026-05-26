import Layout from '../layouts/Layout';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-12 py-16 relative">
        
       
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#00e5ff] rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none"></div>

        
        <section className="flex flex-col md:flex-row items-center justify-between mb-32 gap-16 relative z-10 pt-10">
          <div className="flex-1 max-w-[600px]">
            <div className="inline-flex items-center px-4 py-1.5 bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] rounded-full text-xs font-bold tracking-[0.2em] mb-8">
              AI-POWERED MASTERY
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6 text-white">
              Level up your <br/>Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#0088FF]">Game.</span>
            </h1>
            <p className="text-xl text-[#8c92a4] mb-12 max-w-[500px] leading-relaxed">
              Practice, get instant feedback, and land your first job faster. Move from fresher to industry expert with our structured level-based training.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 bg-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.3)] text-[#0F111A] rounded-xl font-bold transition hover:bg-[#00cbe5] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] text-lg">
                Start for Free
              </Link>
            </div>
          </div>
          <div className="flex-[1.2] relative w-full">
            <div className="w-full bg-[#1C1F2E] rounded-[2.5rem] aspect-[16/11] relative overflow-hidden shadow-2xl bg-cover bg-no-repeat border border-white/5" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop")', backgroundPosition: '80% 15%' }}>
              <div className="absolute inset-0 bg-[#0F111A]/40 mix-blend-multiply"></div>
              
              <div className="absolute top-6 right-6 bg-[#11141D]/90 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 border border-white/10 text-white backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00e5ff]"></div>
                LIVE FEEDBACK ACTIVE
              </div>

              <div className="absolute bottom-6 left-6 bg-[#11141D]/95 p-6 rounded-2xl w-[320px] shadow-2xl backdrop-blur-xl border border-white/10">
                <div className="font-bold text-[#00E5FF] mb-3 flex items-center gap-2">
                  <img src="https://img.icons8.com/ios-filled/50/00e5ff/lightning-bolt--v1.png" alt="insight" className="w-4 h-4 object-contain" />
                  Neon AI Insight
                </div>
                <div className="text-[13px] text-[#8c92a4] italic leading-relaxed">
                  "Your response about scalable architecture was excellent. You covered load balancing well, but consider mentioning database sharding."
                </div>
              </div>
            </div>
          </div>
        </section>

       
        <section className="mb-32 text-center relative z-10 pt-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">The Training Suite</h2>
          <p className="mx-auto mb-16 max-w-[600px] text-lg text-[#8c92a4]">
            Everything you need to transform from a nervous candidate into a confident, highly-prepared professional.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-left">
           
            <div className="bg-[#1C1F2E] rounded-3xl p-10 flex flex-col shadow-lg border border-white/5 hover:border-white/10 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-[#252839] flex items-center justify-center text-[#00E5FF] mb-8 border border-[#00e5ff]/20">
                <img src="https://img.icons8.com/ios-filled/50/00e5ff/play--v1.png" alt="play" className="w-8 h-8 object-contain" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">AI Simulator</h3>
              <p className="text-[#8c92a4] mb-10 flex-1 text-lg leading-relaxed">Experience realistic mock interviews with our AI agents that dynamically adapt to your industry and role seniority.</p>
              
              <div className="bg-[#0F111A] rounded-2xl p-12 flex justify-center items-center relative overflow-hidden border border-white/5 group-hover:border-[#00e5ff]/30 transition-colors">
                <div className="absolute inset-0 opacity-[0.03] bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542382121-729f27d2c3e4?q=80&w=800&auto=format&fit=crop")' }}></div>
                <Link to="/landing-simulator" className="relative z-10 inline-flex items-center justify-center px-8 py-3.5 bg-[#00E5FF] text-[#0F111A] rounded-xl font-bold transition hover:bg-[#00cbe5] shadow-[0_0_15px_rgba(0,229,255,0.2)]">Launch Simulator</Link>
              </div>
            </div>

            
            <div className="bg-[#0f111a] rounded-3xl p-10 flex flex-col shadow-lg border border-white/5 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF] to-[#0055ff] mix-blend-overlay opacity-[0.05]"></div>
              
              <div className="w-16 h-16 rounded-2xl bg-[#1C1F2E] flex items-center justify-center text-white mb-8 border border-white/10 relative z-10">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/bar-chart.png" alt="analytics" className="w-8 h-8 object-contain" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white relative z-10">Performance Analytics</h3>
              <p className="text-[#8c92a4] mb-10 flex-1 text-lg leading-relaxed relative z-10">Track your progress with deep analytics on confidence levels, speech pace, and technical accuracy over time.</p>
              
              <div className="bg-[#1C1F2E] rounded-2xl pt-8 px-8 flex items-end justify-between h-[180px] gap-3 overflow-hidden border border-white/5 relative z-10">
                <div className="w-full bg-[#252839] rounded-t-lg h-[40%] transition-all hover:bg-[#00e5ff]"></div>
                <div className="w-full bg-[#00e5ff] rounded-t-lg h-[70%] shadow-[0_0_15px_rgba(0,229,255,0.4)] relative"><div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-white bg-[#0f111a] px-2 py-0.5 rounded">84%</div></div>
                <div className="w-full bg-[#252839] rounded-t-lg h-[50%] transition-all hover:bg-[#00e5ff]"></div>
                <div className="w-full bg-[#0055ff] rounded-t-lg h-[90%] shadow-[0_0_15px_rgba(0,85,255,0.4)]"></div>
                <div className="w-full bg-[#252839] rounded-t-lg h-[80%] transition-all hover:bg-[#00e5ff]"></div>
              </div>
            </div>
          </div>
          
        </section>

      
        <section className="bg-gradient-to-r from-[#1C1F2E] to-[#12151f] text-white rounded-[2.5rem] py-24 px-12 text-center shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF] rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight relative z-10">Ready to command the room?</h2>
          <p className="mx-auto mb-12 max-w-[600px] text-xl text-[#8c92a4] relative z-10">
            Join thousands of ambitious candidates transitioning into top-tier tech roles.
          </p>
          <Link to="/register" className="inline-flex items-center justify-center px-12 py-5 bg-[#00E5FF] text-[#0F111A] rounded-xl font-extrabold transition hover:bg-[#00cbe5] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] text-lg shadow-[0_0_20px_rgba(0,229,255,0.2)] relative z-10">
            Get Started For Free
          </Link>
          <div className="mt-8 text-sm text-[#5e6376] font-semibold tracking-wide uppercase relative z-10">
            No credit card required. Master your first 3 sessions free.
          </div>
        </section>
      </div>
    </Layout>
  );
}
