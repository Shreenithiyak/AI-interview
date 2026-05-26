import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import { useCompany } from '../context/CompanyContext';
import { useAuth } from '../context/AuthContext';

const RoleCard = ({ id, title, description, onSelect }) => {
  const { selectedRoleId, setSelectedRoleId } = useRole();
  const active = selectedRoleId === id;

  const handleClick = (e) => {
    e.preventDefault();
    setSelectedRoleId(id);
    if (onSelect) onSelect();
  };

  return (
    <div 
      onClick={handleClick}
      className={`cursor-pointer block p-6 rounded-2xl border transition-all duration-300 relative group shadow-sm
        ${active ? 'border-[#00cbe5] dark:border-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.05)] bg-gradient-to-b from-white to-slate-50 dark:from-[#1a1c29] dark:to-[#13151f]' : 'border-slate-200 dark:border-white/5 bg-white dark:bg-[#171923] hover:border-slate-350 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-[#1a1c29]'}
      `}
    >
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2 group-hover:text-[#00cbe5] dark:group-hover:text-[#00e5ff] transition-colors">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-[#8c92a4] mb-8 leading-relaxed h-[60px]">{description}</p>
      
      <div className="flex items-center justify-between text-slate-550 dark:text-[#8c92a4]">
        <span className="text-[10px] uppercase tracking-wider font-bold bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-full">
          3 Levels
        </span>
      </div>
    </div>
  );
};

const CompanyLogo = ({ abbreviation, fullName }) => {
  const { setSelectedCompany } = useCompany();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    setSelectedCompany(fullName);
    navigate('/questions');
  };

  return (
    <button 
      onClick={handleClick}
      className="flex flex-col items-center gap-3 group outline-none bg-transparent border-none p-0"
    >
      <div className="w-16 h-16 bg-white dark:bg-[#171923] border border-slate-200 dark:border-white/5 rounded-xl flex items-center justify-center text-sm font-bold text-slate-800 dark:text-white shadow-sm transition-all cursor-pointer group-hover:border-[#00cbe5]/50 dark:group-hover:border-[#00e5ff]/50 group-hover:bg-slate-50 dark:group-hover:bg-[#1a1c29] group-focus-visible:border-[#00cbe5]/50 dark:group-focus-visible:border-[#00e5ff]/50 group-focus-visible:bg-slate-50 dark:group-focus-visible:bg-[#1a1c29] group-focus-visible:ring-2 group-focus-visible:ring-[#00cbe5]/50 dark:group-focus-visible:ring-[#00e5ff]/50">
        {abbreviation}
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold text-slate-800 dark:text-white mb-0.5 group-hover:text-[#00cbe5] dark:group-hover:text-[#00e5ff] transition-colors">{fullName}</div>
        <div className="text-[9px] text-slate-400 dark:text-[#8c92a4] uppercase tracking-widest font-medium">Question Bank</div>
      </div>
    </button>
  );
};


export default function Practice() {
  const [activeTab, setActiveTab] = useState('technology');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [companySearchTerm, setCompanySearchTerm] = useState('');
  const [showAllRoles, setShowAllRoles] = useState(false);
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  
  const { roles, handleGenerateRoles } = useRole();
  const { companies } = useCompany();
  const { user } = useAuth();

  const filteredRoles = roles.filter(role => 
    role.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const displayedRoles = showAllRoles || searchTerm ? filteredRoles : filteredRoles.slice(0, 8);

  const filteredCompanies = companies.filter(company => 
    company.fullName.toLowerCase().includes(companySearchTerm.toLowerCase()) || 
    company.abbreviation.toLowerCase().includes(companySearchTerm.toLowerCase())
  );
  const displayedCompanies = showAllCompanies || companySearchTerm ? filteredCompanies : filteredCompanies.slice(0, 8);

  const handleGenerateClick = () => {
    handleGenerateRoles();
    setShowAllRoles(true); // Auto-expand to show the newly generated roles
  };

  return (
    <DashboardLayout>
      <div className="py-8 max-w-[1100px] mx-auto">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight transition-colors duration-300">
          Hey {user?.name || 'You'}, Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8370ff] to-[#df92ff] dark:from-[#b9b0ff] dark:to-[#f4d5ff]">Next Interview</span>
        </h1>
        <p className="text-lg text-slate-550 dark:text-[#8c92a4] mb-12 max-w-2xl leading-relaxed transition-colors duration-300">
          Choose your focus area or a specific company bank to begin tailored mock sessions powered by high-fidelity AI coaching.
        </p>

        {/* Filters & Tabs */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10 w-full">
          <div className="flex bg-slate-100 dark:bg-[#171923] p-1 rounded-xl w-full md:w-auto overflow-hidden border border-slate-200 dark:border-transparent transition-colors duration-300">
            <button 
              onClick={() => setActiveTab('technology')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00cbe5]/50 dark:focus-visible:ring-[#00e5ff]/50 ${activeTab === 'technology' ? 'bg-[#00cbe5] dark:bg-[#00e5ff] text-white dark:text-[#0f111a]' : 'text-slate-650 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
            >
              By Technology
            </button>
            <button 
              onClick={() => setActiveTab('company')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00cbe5]/50 dark:focus-visible:ring-[#00e5ff]/50 ${activeTab === 'company' ? 'bg-[#00cbe5] dark:bg-[#00e5ff] text-white dark:text-[#0f111a]' : 'text-slate-650 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}
            >
              By Company (MNC)
            </button>
          </div>
          
          {activeTab === 'technology' && (
            <div className="relative w-full md:max-w-md">
              <img src="https://img.icons8.com/ios-filled/50/8c92a4/search--v1.png" alt="search" className="absolute left-4 top-1/2 -translate-y-[50%] w-4 h-4 object-contain" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search roles..." 
                className="w-full bg-white dark:bg-[#171923] border border-slate-200 dark:border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#5e6376] focus:outline-none focus:border-[#00cbe5]/50 dark:focus:border-[#00e5ff]/50 focus:ring-1 focus:ring-[#00cbe5]/30 dark:focus:ring-[#00e5ff]/30 transition-all font-medium"
              />
            </div>
          )}
        </div>

        {/* Roles Section */}
        {activeTab === 'technology' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {displayedRoles.length > 0 ? (
                displayedRoles.map((role) => (
                  <RoleCard 
                    key={role.id}
                    id={role.id}
                    title={role.title}
                    description={role.description}
                    onSelect={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setActiveTab('company');
                    }}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-slate-500 dark:text-[#8c92a4]">
                  No roles found matching "{searchTerm}"
                </div>
              )}
              
              <button 
                onClick={handleGenerateClick}
                className="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center text-slate-500 dark:text-[#8c92a4] hover:text-slate-800 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/30 transition-all p-6 min-h-[220px]"
              >
                <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/20 flex items-center justify-center mb-4">
                  <img src="https://img.icons8.com/ios-filled/50/8c92a4/plus-math.png" alt="plus" className="w-5 h-5 object-contain" />
                </div>
                <span className="font-semibold">Request New Role</span>
              </button>
            </div>

            {filteredRoles.length > 8 && !searchTerm && (
              <div className="flex justify-center mb-16">
                <button 
                  onClick={() => setShowAllRoles(!showAllRoles)}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-[#1a1c29] transition-colors"
                >
                  {showAllRoles ? "Show Less Roles" : `Show All Roles (${filteredRoles.length})`}
                </button>
              </div>
            )}
          </>
        )}

        {/* Target Top MNCs */}
        {activeTab === 'company' && (
          <div className="pt-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-800 dark:text-white transition-colors duration-300">
                <img src="https://img.icons8.com/ios-filled/50/00e5ff/briefcase.png" alt="briefcase" className="w-6 h-6 object-contain" />
                Target Top MNCs
              </h2>
              <div className="relative w-full md:w-64">
                <img src="https://img.icons8.com/ios-filled/50/8c92a4/search--v1.png" alt="search" className="absolute left-4 top-1/2 -translate-y-[50%] w-3.5 h-3.5 object-contain" />
                <input 
                  type="text" 
                  value={companySearchTerm}
                  onChange={(e) => setCompanySearchTerm(e.target.value)}
                  placeholder="Search companies..." 
                  className="w-full bg-white dark:bg-[#171923] border border-slate-200 dark:border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#5e6376] focus:outline-none focus:border-[#00cbe5]/50 dark:focus:border-[#00e5ff]/50 focus:ring-1 focus:ring-[#00cbe5]/30 dark:focus:ring-[#00e5ff]/30 transition-all font-medium"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 w-full pb-4">
              {displayedCompanies.length > 0 ? (
                displayedCompanies.map(company => (
                  <div key={company.abbreviation} className="flex justify-center">
                    <CompanyLogo abbreviation={company.abbreviation} fullName={company.fullName} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-slate-500 dark:text-[#8c92a4] text-sm py-4 w-full text-center">
                  No companies found matching "{companySearchTerm}"
                </div>
              )}
            </div>
            
            {filteredCompanies.length > 8 && !companySearchTerm && (
              <div className="flex justify-center mt-6">
                <button 
                  onClick={() => setShowAllCompanies(!showAllCompanies)}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold hover:bg-slate-50 dark:hover:bg-[#1a1c29] transition-colors"
                >
                  {showAllCompanies ? "Show Less Companies" : `View Top ${filteredCompanies.length} MNCs`}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
