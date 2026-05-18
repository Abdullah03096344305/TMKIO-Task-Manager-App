import React from 'react';
import { Users2, Calendar, SlidersHorizontal } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Website Redesign',
    desc: 'Redesign company website with new branding',
    initial: 'W',
    initialBg: 'bg-indigo-600',
    status: 'Active',
    statusColor: 'text-emerald-400 bg-emerald-500/10',
    progress: 65,
    progressBarColor: 'bg-[#5f47ff]',
    members: 3,
  },
  {
    id: 2,
    title: 'Mobile App Development',
    desc: 'Build iOS and Android app for the platform',
    initial: 'M',
    initialBg: 'bg-purple-600',
    status: 'Active',
    statusColor: 'text-emerald-400 bg-emerald-500/10',
    progress: 35,
    progressBarColor: 'bg-[#9d4edd]',
    members: 3,
  },
  {
    id: 3,
    title: 'Marketing Campaign',
    desc: 'Q4 marketing campaign for product launch',
    initial: 'M',
    initialBg: 'bg-pink-600',
    status: 'On-hold',
    statusColor: 'text-amber-500 bg-amber-500/10',
    progress: 15,
    progressBarColor: 'bg-pink-500',
    members: 2,
  },
  {
    id: 4,
    title: 'User Research',
    desc: 'Conduct user interviews and surveys',
    initial: 'U',
    initialBg: 'bg-emerald-600',
    status: 'Completed',
    statusColor: 'text-indigo-400 bg-indigo-500/10',
    progress: 100,
    progressBarColor: 'bg-emerald-500',
    members: 2,
  },
  {
    id: 5,
    title: 'Content Strategy',
    desc: 'Develop content plan for blog and social media',
    initial: 'C',
    initialBg: 'bg-amber-500',
    status: 'Active',
    statusColor: 'text-emerald-400 bg-emerald-500/10',
    progress: 40,
    progressBarColor: 'bg-amber-500',
    members: 2,
  },
];

const ProjectGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {projects.map((project) => (
        <div key={project.id} className="bg-[#181b2a] border border-slate-800/60 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            {/* Top Row */}
            <div className="flex justify-between items-center mb-4">
              <div className={`w-9 h-9 rounded-xl ${project.initialBg} flex items-center justify-center font-semibold text-white text-sm`}>
                {project.initial}
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${project.statusColor}`}>
                {project.status}
              </span>
            </div>

            {/* Title & Desc */}
            <h3 className="text-white font-semibold text-base mb-1">{project.title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6 line-clamp-2">{project.desc}</p>
          </div>

          {/* Progress & Meta */}
          <div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mb-4 overflow-hidden">
              <div className={`h-full ${project.progressBarColor}`} style={{ width: `${project.progress}%` }}></div>
            </div>
            <div className="flex justify-between items-center text-slate-400 text-xs">
              <div className="flex items-center gap-1.5">
                <Users2 className="w-3.5 h-3.5" />
                <span>{project.members} members</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{project.progress}% complete</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Upcoming Tasks Section Box */}
      <div className="bg-[#181b2a] border border-slate-800/60 rounded-2xl p-5 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white font-semibold text-base">Upcoming Tasks</h3>
          <button className="text-slate-400 hover:text-white transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center text-center p-4">
          <p className="text-slate-400 text-sm max-w-[200px]">No upcoming tasks for the next 7 days</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectGrid;