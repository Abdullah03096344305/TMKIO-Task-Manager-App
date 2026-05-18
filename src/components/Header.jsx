'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { Search, Bell, HelpCircle, Moon, Plus } from 'lucide-react';

const Header = () => {
  const { user } = useUser();
  const firstName = user?.firstName || 'Mostafa';

  return (
    <header className="flex items-center justify-between mb-8">
      {/* Greeting */}
      <h1 className="text-2xl font-bold text-white">Hi , {firstName}</h1>

      {/* Actions Toolbar */}
      <div className="flex items-center gap-6">
        {/* Search Input */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#1e2235] text-slate-200 pl-10 pr-4 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
          />
        </div>

        {/* Action Button */}
        <button className="flex items-center gap-2 bg-[#5f47ff] hover:bg-[#4c36e0] text-white px-4 py-2 rounded-xl font-medium text-sm transition-colors">
          <Plus className="w-4 h-4" />
          New Project
        </button>

        {/* Icons Utility Group */}
        <div className="flex items-center gap-4 text-slate-400">
          <button className="hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full"></span>
          </button>
          <button className="hover:text-white transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className="hover:text-white transition-colors">
            <Moon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;