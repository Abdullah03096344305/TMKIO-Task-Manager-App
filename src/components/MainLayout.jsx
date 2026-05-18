'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardView from './DashboardView';  // View 1 (Core Cards & Analytics)
import ProjectsView from './ProjectsView';    // View 2 (Timeline Agenda View Layout)
import TeamView from './TeamView';            // View 3 (Team Message Space Layout)
import SettingsView from './SettingsView';    // View 4 (Account/Preferences Configuration Panel)
import FilesView from './FilesView';  
import TasksView from './TasksView';        // View 5 (Your Complete Folders/Storage View)

const MainLayout = () => {
  const [currentView, setCurrentView] = useState('Dashboard');

  return (
    <div className="flex min-h-screen bg-[#121420] text-slate-100">
      {/* State Tracking Action Sidebar Component */}
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      {/* Central Interactive Viewport Panel Content Canvas */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mt-2">
          {currentView === 'Dashboard' && <DashboardView />}
          {currentView === 'Projects' && <ProjectsView />}
          {currentView === 'Tasks' && <TasksView />}
          {currentView === 'Team' && <TeamView />}
          {currentView === 'Settings' && <SettingsView />}
          {currentView === 'Files' && <FilesView />}
          
          
          {/* Catch-all Fallback block if you click All Updates */}
          {!['Dashboard', 'Projects','Tasks', 'Team', 'Settings', 'Files'].includes(currentView) && (
            <div className="flex flex-col items-center justify-center h-[70vh] text-slate-500">
              <p className="text-base font-semibold">{currentView} Space Area is clear</p>
              <p className="text-xs text-slate-600 mt-1">Yeyyyyyyyyy</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;