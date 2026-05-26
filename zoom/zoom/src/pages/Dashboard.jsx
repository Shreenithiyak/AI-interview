import DashboardLayout from '../layouts/DashboardLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const ActivityRow = ({ icon, title, date, score }) => (
  <div className="bg-white dark:bg-[#1C1F2E] reading:bg-[#fcf6e8] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center sm:items-start md:items-center gap-4 border border-slate-200 dark:border-white/5 reading:border-[#433422]/12 hover:border-slate-300 dark:hover:border-white/10 reading:hover:border-[#433422]/20 transition-colors">
    <div className="flex items-center gap-5 w-full md:w-auto">
      <div className="w-12 h-12 bg-slate-100 dark:bg-[#252839] reading:bg-[#f2e7d3] rounded-xl flex items-center justify-center text-slate-500 dark:text-[#8c92a4] reading:text-[#7b654a] shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white reading:text-[#433422] mb-0.5">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-[#8c92a4] reading:text-[#7b654a]">Completed • {date}</p>
      </div>
    </div>
    
    <div className="flex items-center justify-between md:justify-end gap-12 w-full md:w-auto">
      <div className="text-center md:text-right">
        <div className="text-[10px] text-slate-500 dark:text-[#8c92a4] reading:text-[#7b654a] uppercase tracking-wider font-semibold mb-1">Score</div>
        <div className="text-xl font-bold text-slate-900 dark:text-white reading:text-[#433422] leading-none">{score}%</div>
      </div>
      <Link to="/history" className="text-[#00cbe5] dark:text-[#00e5ff] reading:text-[#b25e00] font-semibold text-sm flex items-center gap-1 hover:text-[#00b8d4] dark:hover:text-[#00cbe5] transition-colors">
        View Feedback 
        <img src="https://img.icons8.com/ios-filled/50/00e5ff/chevron-right.png" alt="arrow" className="w-4 h-4 object-contain reading:brightness-50" />
      </Link>
    </div>
  </div>
);

const TestimonialRow = ({ userProfile, text, role, company }) => (
  <div className="bg-white dark:bg-[#1C1F2E] reading:bg-[#fcf6e8] rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center sm:items-start md:items-center gap-4 border border-slate-200 dark:border-white/5 reading:border-[#433422]/12 hover:border-slate-300 dark:hover:border-white/10 reading:hover:border-[#433422]/20 transition-colors">
    <div className="flex items-center gap-5 w-full md:w-auto">
      <div className="w-12 h-12 bg-slate-100 dark:bg-[#252839] reading:bg-[#f2e7d3] rounded-full flex items-center justify-center text-slate-500 dark:text-[#8c92a4] reading:text-[#7b654a] shrink-0 overflow-hidden">
        <img src={userProfile} alt="user" className="w-full h-full object-cover" />
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white reading:text-[#433422] mb-0.5 max-w-lg">"{text}"</h3>
        <p className="text-sm text-slate-500 dark:text-[#8c92a4] reading:text-[#7b654a]">{role} at {company}</p>
      </div>
    </div>

    <div className="flex items-center justify-between md:justify-end gap-12 w-full md:w-auto mt-4 md:mt-0">
      <Link to="/reviews" className="text-[#00cbe5] dark:text-[#00e5ff] reading:text-[#b25e00] font-semibold text-sm flex items-center gap-1 hover:text-[#00b8d4] dark:hover:text-[#00cbe5] transition-colors">
        Read Full Review
        <img src="https://img.icons8.com/ios-filled/50/00e5ff/chevron-right.png" alt="arrow" className="w-4 h-4 object-contain reading:brightness-50" />
      </Link>
    </div>
  </div>
);

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(user);

  useEffect(() => {
    // Wait a brief moment to ensure AuthContext has initialized from localStorage
    const checkAuth = setTimeout(() => {
      if (!token) {
        console.log("No token found, redirecting to login...");
        navigate('/login');
      }
    }, 100);

    return () => clearTimeout(checkAuth);
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      if (token === 'social-login-token') {
        setProfile(user);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/user/logindata`, {
          method: 'GET',
          headers: {
            'Authorization': token
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfile({ ...user, name: data.msg.name, id: data.msg.id });
        } else {
          // Token invalid or expired
          logout();
          navigate('/login');
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };

    fetchProfile();
  }, [token, navigate, logout, user]);


  const isNewLogin = !profile?.history || profile?.history?.length === 0;

  const getDisplayName = () => {
    if (!profile) return 'Alex';


    if (profile.name && profile.name.endsWith(' User')) {
      if (profile.email) {
        const prefix = profile.email.split('@')[0];
        return prefix.charAt(0).toUpperCase() + prefix.slice(1);
      }
    }

    return profile.name ? profile.name.split(' ')[0] : 'Alex';
  };

  return (
    <DashboardLayout>
      <div className="max-w-[1280px] mx-auto pb-12 text-left">

        {/* Welcome Hero */}
        <div className="mb-14 pt-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white reading:text-[#433422] mb-6 tracking-tight leading-tight">
            Hello, {getDisplayName()}. <span className="text-[#00cbe5] dark:text-[#00E5FF] reading:text-[#b25e00]">Ready to level up today?</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-[#8c92a4] reading:text-[#7b654a] max-w-3xl leading-relaxed mb-10">
            {isNewLogin
              ? "Welcome to Neon. It looks like you're ready to start your journey. Let's do a quick mock interview."
              : <span>You're <strong className="text-slate-900 dark:text-white reading:text-[#433422] font-semibold">{profile?.history?.[0]?.score || 84}% ready</strong> for your next Technical Interview. Our AI suggests focusing on System Design today.</span>}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/practice" className="px-8 py-3.5 bg-[#00cbe5] dark:bg-[#00e5ff] reading:bg-[#b25e00] text-white dark:text-[#0f111a] reading:text-white font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:bg-[#00b8d4] dark:hover:bg-[#00cbe5] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-3">
              <img src="https://img.icons8.com/ios-filled/50/0f111a/play--v1.png" alt="play" className="w-5 h-5 object-contain reading:brightness-200" />
              Start Mock Interview
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Score */}
          <div className="bg-white dark:bg-[#1C1F2E] reading:bg-[#fcf6e8] rounded-3xl p-8 border border-slate-200 dark:border-white/5 reading:border-[#433422]/12 relative overflow-hidden flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="text-[11px] font-bold text-slate-500 dark:text-[#8c92a4] reading:text-[#7b654a] uppercase tracking-widest">Overall Score</div>
              <img src="https://img.icons8.com/ios-filled/50/00e5ff/bullseye.png" alt="score" className="w-5 h-5 object-contain reading:brightness-50" />
            </div>
            <div className="flex items-end gap-3 mb-8">
              <div className="text-6xl font-bold text-slate-900 dark:text-white reading:text-[#433422] leading-none tracking-tight">{isNewLogin ? '0%' : `${profile?.history?.[0]?.score || 84}%`}</div>
              {!isNewLogin && <div className="text-sm font-bold text-[#10b981] mb-1">+2.4%</div>}
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-[#252839] reading:bg-[#f2e7d3] rounded-full overflow-hidden">
              <div className="h-full bg-[#00cbe5] dark:bg-[#00e5ff] reading:bg-[#b25e00] rounded-full shadow-[0_0_10px_#00e5ff] transition-all duration-1000" style={{ width: isNewLogin ? '0%' : `${profile?.history?.[0]?.score || 84}%` }}></div>
            </div>
          </div>

          {/* Card 2: Interviews */}
          <div className="bg-white dark:bg-[#1C1F2E] reading:bg-[#fcf6e8] rounded-3xl p-8 border border-slate-200 dark:border-white/5 reading:border-[#433422]/12 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="text-[11px] font-bold text-slate-500 dark:text-[#8c92a4] reading:text-[#7b654a] uppercase tracking-widest">Interviews Completed</div>
              <img src="https://img.icons8.com/ios-filled/50/c4b5fd/clipboard.png" alt="interviews" className="w-5 h-5 object-contain reading:brightness-50" />
            </div>
            <div className="flex items-end gap-2 mb-8">
              <div className="text-6xl font-bold text-slate-900 dark:text-white reading:text-[#433422] leading-none tracking-tight">{isNewLogin ? '0' : (profile?.history?.length || 12)}</div>
              <div className="text-slate-500 dark:text-[#8c92a4] reading:text-[#7b654a] font-medium mb-1">Sessions</div>
            </div>
            <div className="text-sm text-slate-500 dark:text-[#8c92a4] reading:text-[#7b654a]">
              {isNewLogin ? 'Complete your first session!' : '3 scheduled for next week'}
            </div>
          </div>

          {/* Card 3: Streak */}
          <div className="bg-white dark:bg-[#1C1F2E] reading:bg-[#fcf6e8] rounded-3xl p-8 border border-slate-200 dark:border-white/5 reading:border-[#433422]/12 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="text-[11px] font-bold text-slate-500 dark:text-[#8c92a4] reading:text-[#7b654a] uppercase tracking-widest">Weekly Streak</div>
              <img src="https://img.icons8.com/ios-filled/50/fbbf24/fire-element.png" alt="streak" className="w-5 h-5 object-contain reading:brightness-50" />
            </div>
            <div className="flex items-end gap-2 mb-8">
              <div className="text-6xl font-bold text-slate-900 dark:text-white reading:text-[#433422] leading-none tracking-tight">{isNewLogin ? '0' : '5'}</div>
              <div className="text-slate-500 dark:text-[#8c92a4] reading:text-[#7b654a] font-medium mb-1">Days</div>
            </div>
            <div className="flex justify-between gap-2">
              <div className={`h-2 flex-1 rounded-full ${isNewLogin ? 'bg-slate-200 dark:bg-[#252839] reading:bg-[#f2e7d3]' : 'bg-[#00cbe5] dark:bg-[#00e5ff] reading:bg-[#b25e00] shadow-[0_0_8px_rgba(0,229,255,0.5)]'}`}></div>
              <div className={`h-2 flex-1 rounded-full ${isNewLogin ? 'bg-slate-200 dark:bg-[#252839] reading:bg-[#f2e7d3]' : 'bg-[#00cbe5] dark:bg-[#00e5ff] reading:bg-[#b25e00] shadow-[0_0_8px_rgba(0,229,255,0.5)]'}`}></div>
              <div className={`h-2 flex-1 rounded-full ${isNewLogin ? 'bg-slate-200 dark:bg-[#252839] reading:bg-[#f2e7d3]' : 'bg-[#00cbe5] dark:bg-[#00e5ff] reading:bg-[#b25e00] shadow-[0_0_8px_rgba(0,229,255,0.5)]'}`}></div>
              <div className={`h-2 flex-1 rounded-full ${isNewLogin ? 'bg-slate-200 dark:bg-[#252839] reading:bg-[#f2e7d3]' : 'bg-[#00cbe5] dark:bg-[#00e5ff] reading:bg-[#b25e00] shadow-[0_0_8px_rgba(0,229,255,0.5)]'}`}></div>
              <div className={`h-2 flex-1 rounded-full ${isNewLogin ? 'bg-slate-200 dark:bg-[#252839] reading:bg-[#f2e7d3]' : 'bg-[#00cbe5] dark:bg-[#00e5ff] reading:bg-[#b25e00] shadow-[0_0_8px_rgba(0,229,255,0.5)]'}`}></div>
              <div className="h-2 flex-1 rounded-full bg-slate-200 dark:bg-[#252839] reading:bg-[#f2e7d3]"></div>
              <div className="h-2 flex-1 rounded-full bg-slate-200 dark:bg-[#252839] reading:bg-[#f2e7d3]"></div>
            </div>
          </div>
        </div>

        {/* Activity / Testimonials */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white reading:text-[#433422] tracking-tight">{isNewLogin ? 'Success Stories' : 'Recent Activity'}</h2>
        </div>

        <div className="flex flex-col gap-4">
          {isNewLogin ? (
            <>
              <TestimonialRow
                userProfile="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop"
                text="The system design practice felt exactly like my real interview at FAANG. The AI mentor's tips were spot on."
                role="Senior QA to SWE"
                company="TechCorp"
              />
              <TestimonialRow
                userProfile="https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=150&auto=format&fit=crop"
                text="Neon helped me pivot my career. The behavioral agent really boosted my confidence when answering tricky culture-fit questions."
                role="Frontend Developer"
                company="InnovateInc"
              />
              <TestimonialRow
                userProfile="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                text="From 0 to hired in 3 weeks. The mock interviews identified exactly what I was missing."
                role="Fullstack Engineer"
                company="StartupX"
              />
              <TestimonialRow
                userProfile="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
                text="Neon's real-time feedback completely transformed how I handle architectural questions under pressure."
                role="Backend Architect"
                company="Fintech Corp"
              />
            </>
          ) : (
            <>
              <ActivityRow
                title="Senior Frontend Engineer"
                date="Oct 24, 2024"
                score="92"
                icon={<CodeIcon />}
              />
              <ActivityRow
                title="Backend Architecture"
                date="Oct 22, 2024"
                score="78"
                icon={<DatabaseIcon />}
              />
              <ActivityRow
                title="Behavioral Foundations"
                date="Oct 19, 2024"
                score="85"
                icon={<UserIcon />}
              />
            </>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}

const CodeIcon = () => (
  <img src="https://img.icons8.com/ios-filled/50/8c92a4/code.png" alt="code" className="w-5 h-5 object-contain reading:brightness-50" />
);

const DatabaseIcon = () => (
  <img src="https://img.icons8.com/ios-filled/50/8c92a4/database.png" alt="database" className="w-5 h-5 object-contain reading:brightness-50" />
);

const UserIcon = () => (
  <img src="https://img.icons8.com/ios-filled/50/8c92a4/user.png" alt="user" className="w-5 h-5 object-contain reading:brightness-50" />
);
