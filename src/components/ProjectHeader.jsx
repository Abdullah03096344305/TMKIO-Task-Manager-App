import React from 'react';
import { Plus } from 'lucide-react';

const ProjectHeader = ({ onAddProject }) => {
  return (
    <div className="flex flex-col gap-6 mb-6">
      {/* Top Controller Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <div className="rounded-2xl bg-slate-900 px-3 py-1 text-slate-400">Projects</div>
          </div>
        </div>

        {/* New Project Button */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onAddProject}
            className="flex items-center gap-2 bg-[#5f47ff] hover:bg-[#4c36e0] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      {/* Main Title Metadata Grid */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span>🎒</span> Web Design
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Fintask Landing Page</h2>
        </div>

        <div className="flex gap-12 text-sm">
          <div>
            <p className="text-xl font-bold text-slate-300">ORM</p>
            <p className="text-xs text-slate-500 font-medium tracking-wide mt-1">COMPANY</p>
          </div>
          <div>
            <p className="text-xl font-bold text-slate-300">15 Jul 2022</p>
            <p className="text-xs text-slate-500 font-medium tracking-wide mt-1">START DATE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;