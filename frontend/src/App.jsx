import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AudioProvider } from './contexts/AudioContext';
import { RealtimeDataProvider } from './contexts/RealtimeDataContext';
import { Navbar } from './components/navigation/Navbar';
import { Sidebar } from './components/navigation/Sidebar';
import { MobileNav } from './components/navigation/MobileNav';
import { CommandPalette } from './components/navigation/CommandPalette';
import Footer from './components/common/Footer';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { VisionPage } from './pages/VisionPage';
import { CoralPage } from './pages/CoralPage';
import { CensusPage } from './pages/CensusPage';
import { AtlasPage } from './pages/AtlasPage';
import { FleetPage } from './pages/FleetPage';
import { RiskPage } from './pages/RiskPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AlertsPage } from './pages/AlertsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

function AppLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-[#020914] text-slate-100 font-sans flex flex-col">
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(prev => !prev)}
        />

        <main className={`flex-1 transition-all duration-300 p-4 lg:p-8 ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
        } mb-16 lg:mb-0`}>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/mission-control" element={<DashboardPage />} />
            <Route path="/vision" element={<VisionPage />} />
            <Route path="/coral" element={<CoralPage />} />
            <Route path="/census" element={<CensusPage />} />
            <Route path="/atlas" element={<AtlasPage />} />
            <Route path="/fleet" element={<FleetPage />} />
            <Route path="/risk" element={<RiskPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>

      <div className={`${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} transition-all duration-300`}>
        <Footer />
      </div>

      <MobileNav />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <RealtimeDataProvider>
        <Router>
          <AppLayout />
        </Router>
      </RealtimeDataProvider>
    </AudioProvider>
  );
}
