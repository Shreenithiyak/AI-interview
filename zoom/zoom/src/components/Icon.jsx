import React from 'react';
import { 
  FiBell, FiAward, FiCalendar, FiGrid, FiVideo, FiBook, 
  FiBarChart2, FiSettings, FiCircle, FiHelpCircle, FiCheck, 
  FiSquare, FiSkipForward, FiRefreshCw, FiArrowRight, 
  FiChevronRight, FiChevronDown, FiFilter, FiUsers, FiTrendingUp 
} from 'react-icons/fi';

// A simple Icon component using react-icons
export const Icon = ({ name, size = 24, className = '', color = 'currentColor' }) => {
  const icons = {
    // Nav icons
    bell: FiBell,
    badge: FiAward,
    calendar: FiCalendar,
    
    // Sidebar icons
    grid: FiGrid,
    video: FiVideo,
    library: FiBook,
    chart: FiBarChart2,
    settings: FiSettings,
    circle: FiCircle,
    support: FiHelpCircle,
    
    // Check
    check: FiCheck,
    
    // Play/Stop
    stop: FiSquare,
    skip: FiSkipForward,
    restart: FiRefreshCw,

    // Misc
    arrowRight: FiArrowRight,
    chevronRight: FiChevronRight,
    down: FiChevronDown,
    filter: FiFilter,
    users: FiUsers,
    trending: FiTrendingUp
  };

  const IconComponent = icons[name] || FiCircle;

  return (
    <IconComponent 
      size={size} 
      color={color} 
      className={className} 
    />
  );
};
