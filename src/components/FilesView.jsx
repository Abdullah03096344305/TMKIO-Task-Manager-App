'use client';

import React, { useEffect, useState } from 'react';
import { 
  Folder, 
  ChevronDown, 
  Plus, 
  Upload, 
  MoreVertical, 
  FileText, 
  Image as ImageIcon, 
  Figma, 
  Layers
} from 'lucide-react';

// Import your pre-configured supabase client instance
import { supabase } from '@/lib/supabase'; 

const iconRegistry = {
  FileText,
  ImageIcon,
  Figma,
  Layers
};

const FilesView = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data, error } = await supabase
          .from('file_system_dashboard')
          .select('*')
          .eq('dashboard_key', 'default_user_dashboard')
          .single();

        if (error) throw error;
        setDashboardData(data);
      } catch (err) {
        console.error('Error loading dashboard from Supabase:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-sm font-semibold text-slate-400">
        Loading storage workspace...
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-sm font-semibold text-rose-400">
        Failed to load configuration row.
      </div>
    );
  }

  // Destructure properties directly out of the fetched single row
  const { 
    folders, 
    recent_files: recentFiles, 
    storage_overview: storageOverview, 
    chart_bars: chartBars, 
    avatars, 
    file_type_configs: fileTypeConfigs,
    chart_legends: chartLegends 
  } = dashboardData;

  const getFileTypeConfig = (type) => {
    const config = fileTypeConfigs[type] || fileTypeConfigs.doc;
    return {
      IconComponent: iconRegistry[config.iconKey] || FileText,
      colorClass: config.color
    };
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn select-none text-slate-200">
      
      {/* Top action header controls row */}
      <div className="flex justify-end items-center gap-3">
        <button className="flex items-center gap-2 bg-[#5f47ff] hover:bg-[#4c36e0] text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors">
          <Plus className="w-4 h-4" />
          Create New Folder
        </button>
        <button className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors">
          <Upload className="w-4 h-4" />
          Upload
        </button>
      </div>

      {/* Main Structural Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* LEFT COLUMN (Folders + Table Files) */}
        <div className="xl:col-span-3 flex flex-col gap-6">
          
          {/* Folders Windows */}
          <div className="bg-[#181b2a] border border-slate-800/60 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 bg-[#121420] px-3 py-2 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300">
                <Folder className="w-4 h-4 text-blue-500" />
                <span>All Files</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button className="text-xs font-semibold text-slate-400 bg-slate-800/50 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/40 transition-all">
                Show All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {folders.map((folder, idx) => (
                <div key={idx} className="bg-gradient-to-br from-[#1d2238] to-[#16192b] border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-6 relative group hover:border-slate-700/80 transition-all">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl ${folder.color}`}>
                      <Folder className="w-5 h-5 fill-current" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      {folder.tags?.map((tag, tIdx) => (
                        <span key={tIdx} className={`w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center border border-white/5 shadow-sm ${tag === 'A' ? 'bg-[#5f47ff] text-white' : 'bg-cyan-600 text-white'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-wide">{folder.name}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{folder.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Files Panel */}
          <div className="bg-[#181b2a] border border-slate-800/60 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white tracking-wide">Recent File</h3>
              <button className="text-xs font-semibold text-indigo-400 hover:text-indigo-300">View All</button>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-bold text-slate-500 border-b border-slate-800/80">
                    <th className="pb-3 font-semibold">Name</th>
                    <th className="pb-3 font-semibold">Size</th>
                    <th className="pb-3 font-semibold">Last Modified</th>
                    <th className="pb-3 font-semibold">Members</th>
                    <th className="pb-3 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-xs font-medium text-slate-300">
                  {recentFiles.map((file, idx) => {
                    const { IconComponent, colorClass } = getFileTypeConfig(file.type);
                    
                    return (
                      <tr key={idx} className="group hover:bg-slate-800/10 transition-colors">
                        <td className="py-3.5 flex items-center gap-3">
                          <div className={`p-2 rounded-xl ${colorClass}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="font-semibold text-white group-hover:text-indigo-400 transition-colors">{file.name}</span>
                        </td>
                        <td className="py-3.5 text-slate-400">{file.size}</td>
                        <td className="py-3.5 text-slate-400">{file.date}</td>
                        <td className="py-3.5">
                          <div className="flex items-center -space-x-1.5 overflow-hidden">
                            {avatars.map((src, avIdx) => (
                              <img key={avIdx} className="inline-block h-5 w-5 rounded-full ring-2 ring-[#181b2a] object-cover" src={src} alt="Team" />
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 text-right">
                          <button className="text-slate-500 hover:text-white transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (Storage Summary + Activity Chart) */}
        <div className="flex flex-col gap-6">
          
          {/* Storage Progress Metrics Card */}
          <div className="bg-[#181b2a] border border-slate-800/60 rounded-2xl p-6 flex flex-col gap-5">
            <div className="bg-[#5f47ff] rounded-2xl p-5 relative overflow-hidden flex items-center justify-between shadow-lg shadow-indigo-950/20">
              <div className="flex flex-col gap-1.5 z-10">
                <span className="text-xs font-bold text-white/80 tracking-wide">Available Storage</span>
                <span className="text-xs font-medium text-white/60">
                  {storageOverview.available} / {storageOverview.total}
                </span>
              </div>
              <div className="relative w-14 h-14 flex items-center justify-center z-10">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-white/10" strokeWidth="3" stroke="currentColor" fill="transparent" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-white" strokeDasharray={`${storageOverview.percentageUsed}, 100`} strokeWidth="3.2" strokeLinecap="round" stroke="currentColor" fill="transparent" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <span className="absolute text-[10px] font-bold text-white">{storageOverview.percentageUsed}%</span>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
            </div>

            <div className="flex flex-col gap-4">
              {storageOverview.categories.map((item, idx) => {
                const { IconComponent } = getFileTypeConfig(item.type);
                
                return (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <div className="flex items-center gap-2 text-slate-300">
                        <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400">
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <span>{item.label}</span>
                      </div>
                      <span className="text-slate-400">{item.size}</span>
                    </div>
                    <div className="w-full bg-slate-800/60 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Bar Chart Card */}
          <div className="bg-[#181b2a] border border-slate-800/60 rounded-2xl p-6 flex flex-col gap-6">
            <h3 className="text-sm font-bold text-white tracking-wide">Activity Chart</h3>
            
            <div className="h-32 flex items-end justify-between px-2 gap-3.5">
              {chartBars.map((bar, bIdx) => (
                <div key={bIdx} className="flex-1 flex flex-col justify-end h-full gap-0.5 max-w-[16px]">
                  <div className="bg-cyan-500 rounded-t-sm w-full transition-all duration-300" style={{ height: `${bar.docs}%` }} />
                  <div className="bg-amber-500 w-full transition-all duration-300" style={{ height: `${bar.photos}%` }} />
                  <div className="bg-blue-500 rounded-b-sm w-full transition-all duration-300" style={{ height: `${bar.media}%` }} />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-slate-400 pt-2 border-t border-slate-800/40">
              {chartLegends.map((legend, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${legend.color}`} />
                  <span>{legend.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default FilesView;