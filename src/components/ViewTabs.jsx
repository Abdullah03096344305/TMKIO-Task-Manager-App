import React from 'react';
import { LayoutGrid, List, Calendar, Plus, Star, MoreHorizontal } from 'lucide-react';

const ViewTabs = () => {
  return (
    <div className="border-b border-slate-800/80 mb-6">
      <div className="flex items-center justify-between pb-px">
        <div className="flex items-center gap-8 text-sm font-medium text-slate-400">
          {/* Skeleton Tab 1 */}
          <div className="flex items-center gap-2 pb-3 cursor-pointer hover:text-white transition-colors">
            <LayoutGrid className="w-4 h-4" />
            <div className="h-2.5 w-16 bg-slate-700 rounded-full"></div>
          </div>
          {/* Skeleton Tab 2 */}
          <div className="flex items-center gap-2 pb-3 cursor-pointer hover:text-white transition-colors">
            <List className="w-4 h-4" />
            <div className="h-2.5 w-12 bg-slate-700 rounded-full"></div>
          </div>
          {/* Active Calendar View Tab */}
          <div className="flex items-center gap-2 text-slate-200 border-b-2 border-[#5f47ff] pb-3 cursor-pointer">
            <Calendar className="w-4 h-4 text-slate-300" />
            <span>Calendar view</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4 text-slate-400 pb-2">
          <Plus className="w-4 h-4 cursor-pointer hover:text-white" />
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-white">
            <Star className="w-4 h-4" />
            <div className="h-2.5 w-10 bg-slate-700 rounded-full"></div>
          </div>
          <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-white" />
        </div>
      </div>
    </div>
  );
};

export default ViewTabs;