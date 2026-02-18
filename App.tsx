
import React, { useState, useEffect } from 'react';
import { AppTab, UserProfile, Place, MobilityMode } from './types';
import { ICONS, COLORS } from './constants';
import Onboarding from './components/Onboarding';
import HomeView from './components/Home';
import ExploreView from './components/Explore';
import ChatView from './components/Chat';
import ChampionsView from './components/ChampionNetwork';
import DashboardView from './components/Dashboard';
import Wayfinding from './components/Wayfinding';
import MobilitySelector from './components/MobilitySelector';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mobilityTarget, setMobilityTarget] = useState<Place | null>(null);
  const [navigationTarget, setNavigationTarget] = useState<Place | null>(null);
  const [selectedMode, setSelectedMode] = useState<MobilityMode | null>(null);

  useEffect(() => {
    // Check local storage for existing profile
    const saved = localStorage.getItem('albi_profile');
    if (saved) {
      setUserProfile(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  const handleFinishOnboarding = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('albi_profile', JSON.stringify(profile));
  };

  const handleStartMobilitySelection = (place: Place) => {
    setMobilityTarget(place);
  };

  const handleModeSelected = (mode: MobilityMode) => {
    if (mobilityTarget) {
      setSelectedMode(mode);
      setNavigationTarget(mobilityTarget);
      setMobilityTarget(null);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="text-yellow-500 animate-pulse text-2xl font-bold italic">ALBI</div>
      </div>
    );
  }

  if (!userProfile) {
    return <Onboarding onFinish={handleFinishOnboarding} />;
  }

  // Intermediate Step: Mobility Choice
  if (mobilityTarget) {
    return (
      <MobilitySelector 
        destination={mobilityTarget}
        onSelect={handleModeSelected}
        onCancel={() => setMobilityTarget(null)}
      />
    );
  }

  // Final Step: Wayfinding
  if (navigationTarget) {
    return (
      <Wayfinding 
        destination={navigationTarget} 
        onCancel={() => {
          setNavigationTarget(null);
          setSelectedMode(null);
        }} 
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.HOME: return <HomeView user={userProfile} onAction={(tab) => setActiveTab(tab)} onNavigate={handleStartMobilitySelection} />;
      case AppTab.EXPLORE: return <ExploreView />;
      case AppTab.CHAT: return <ChatView user={userProfile} />;
      case AppTab.CHAMPIONS: return <ChampionsView />;
      case AppTab.DASHBOARD: return <DashboardView />;
      default: return <HomeView user={userProfile} onAction={(tab) => setActiveTab(tab)} onNavigate={handleStartMobilitySelection} />;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-black text-white relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]">
      <div className="flex-1 overflow-y-auto pb-24 px-4 pt-6">
        {renderContent()}
      </div>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-neutral-900/90 backdrop-blur-lg border-t border-neutral-800 flex justify-around py-3 px-2 safe-area-bottom z-40">
        <NavButton active={activeTab === AppTab.HOME} icon={ICONS.Home} label="Home" onClick={() => setActiveTab(AppTab.HOME)} />
        <NavButton active={activeTab === AppTab.EXPLORE} icon={ICONS.Explore} label="Explore" onClick={() => setActiveTab(AppTab.EXPLORE)} />
        <NavButton active={activeTab === AppTab.CHAT} icon={ICONS.Chat} label="ALBI" onClick={() => setActiveTab(AppTab.CHAT)} isAlbi />
        <NavButton active={activeTab === AppTab.CHAMPIONS} icon={ICONS.Champions} label="People" onClick={() => setActiveTab(AppTab.CHAMPIONS)} />
        <NavButton active={activeTab === AppTab.DASHBOARD} icon={ICONS.User} label="Profile" onClick={() => setActiveTab(AppTab.DASHBOARD)} />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isAlbi?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ active, icon, label, onClick, isAlbi }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center transition-all duration-200 ${isAlbi ? 'relative -top-4' : ''}`}
  >
    <div className={`p-2 rounded-full ${isAlbi ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 scale-110' : active ? 'text-yellow-500' : 'text-neutral-500'}`}>
      {icon}
    </div>
    <span className={`text-[10px] mt-1 font-medium ${isAlbi ? 'text-yellow-500 mt-5' : active ? 'text-yellow-500' : 'text-neutral-500'}`}>
      {label}
    </span>
  </button>
);

export default App;
