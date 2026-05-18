import React from 'react';
import { Play, MessageSquare, Paperclip, MoreHorizontal } from 'lucide-react';

const TimelineSchedule = () => {
  return (
    <div className="flex flex-col">
      {/* Date & Filter Header Row */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3 cursor-pointer group">
          <Play className="w-3.5 h-3.5 fill-slate-200 text-slate-200 transition-transform group-hover:translate-x-0.5" />
          <h3 className="text-xl font-bold text-slate-200 tracking-tight">November 15</h3>
        </div>
        
        {/* Range Toggle */}
        <div className="bg-[#181b2a] border border-slate-800/60 p-1 rounded-xl flex items-center text-xs font-medium">
          <span className="bg-white text-slate-900 px-3 py-1.5 rounded-lg shadow-sm">Day</span>
          <div className="px-4 py-1 flex gap-2">
            <div className="h-2 w-8 bg-slate-700 rounded-full mt-1"></div>
            <div className="h-2 w-8 bg-slate-700 rounded-full mt-1"></div>
          </div>
        </div>
      </div>

      {/* Grid Timeline Canvas Container */}
      <div className="relative flex flex-col gap-10 pl-24 select-none">
        
        {/* Timeline Row Block 1 */}
        <div className="relative min-h-[80px]">
          <div className="absolute left-[-96px] top-0 text-xs font-semibold text-slate-600">
            <div className="h-2.5 w-14 bg-slate-800 rounded-full"></div>
          </div>
          {/* Card 1: Development */}
          <div className="absolute left-0 top-0 w-64 bg-pink-50 text-slate-900 rounded-2xl p-4 shadow-xl border border-pink-100">
            <span className="text-[11px] text-pink-600 font-semibold tracking-wide">Fintask</span>
            <h4 className="font-bold text-base mt-0.5 mb-3 text-slate-950">Development</h4>
            <div className="flex -space-x-1.5 items-center">
              <img className="w-6 h-6 rounded-full border-2 border-pink-50 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop" alt="dev" />
              <img className="w-6 h-6 rounded-full border-2 border-pink-50 object-cover" src="https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=100&auto=format&fit=crop" alt="dev" />
              <div className="w-6 h-6 rounded-full border-2 border-pink-50 bg-pink-200 text-pink-700 text-[9px] font-bold flex items-center justify-center">5+</div>
            </div>
          </div>
        </div>

        {/* Timeline Row Block 2 */}
        <div className="relative min-h-[90px]">
          {/* Card 2: UX Copywrite */}
          <div className="absolute left-72 top-[-20px] right-20 bg-cyan-50 text-slate-900 rounded-2xl p-4 shadow-xl border border-cyan-100 flex justify-between items-center">
            <div>
              <span className="text-[11px] text-cyan-600 font-semibold tracking-wide">Fintask</span>
              <h4 className="font-bold text-base mt-0.5 text-slate-950">UX Copywrite</h4>
            </div>
            <div className="flex -space-x-1.5 items-center">
              <img className="w-6 h-6 rounded-full border-2 border-cyan-50 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop" alt="writer" />
              <img className="w-6 h-6 rounded-full border-2 border-cyan-50 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop" alt="writer" />
              <div className="w-6 h-6 rounded-full border-2 border-cyan-50 bg-cyan-200 text-cyan-700 text-[9px] font-bold flex items-center justify-center">3+</div>
            </div>
          </div>
        </div>

        {/* Current Time Purple Tracker Pointer */}
        <div className="relative z-10 my-2">
          <div className="absolute left-[-96px] top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#5f47ff]">
            10:00 AM
          </div>
          <div className="w-full flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#5f47ff] -ml-1 shadow-[0_0_8px_#5f47ff]"></div>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-[#5f47ff] to-transparent"></div>
          </div>
        </div>

        {/* Timeline Row Block 3 */}
        <div className="relative min-h-[90px]">
          <div className="absolute left-[-96px] top-0">
            <div className="h-2.5 w-14 bg-slate-800 rounded-full"></div>
          </div>
          {/* Card 3: Bug Fix */}
          <div className="absolute right-0 top-[-20px] w-96 bg-orange-50 text-slate-900 rounded-2xl p-4 shadow-xl border border-orange-100 flex justify-between items-center">
            <div>
              <span className="text-[11px] text-orange-600 font-semibold tracking-wide">Fintask</span>
              <h4 className="font-bold text-base mt-0.5 text-slate-950">Bug Fix</h4>
            </div>
            <div className="flex -space-x-1.5 items-center">
              <img className="w-6 h-6 rounded-full border-2 border-orange-50 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop" alt="qa" />
              <img className="w-6 h-6 rounded-full border-2 border-orange-50 object-cover" src="https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=100&auto=format&fit=crop" alt="qa" />
              <div className="w-6 h-6 rounded-full border-2 border-orange-50 bg-orange-200 text-orange-700 text-[9px] font-bold flex items-center justify-center">10+</div>
            </div>
          </div>
        </div>

        {/* Timeline Row Block 4 */}
        <div className="relative min-h-[160px]">
          <div className="absolute left-[-96px] top-0">
            <div className="h-2.5 w-14 bg-slate-800 rounded-full"></div>
          </div>
          {/* Card 4: Detailed Web Visual Design Sticky Card */}
          <div className="absolute left-14 top-[-20px] w-[500px] bg-[#fbfdec] text-slate-900 rounded-3xl p-6 border border-yellow-200/60 shadow-2xl">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-xs text-slate-500 font-medium tracking-wide">Fintask</span>
                <h4 className="font-bold text-xl text-slate-950 mt-0.5">Web Visual Design</h4>
              </div>
              <MoreHorizontal className="w-5 h-5 text-slate-700 cursor-pointer" />
            </div>

            {/* Tags & Meta Row */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1">
                  <img className="w-6 h-6 rounded-full border-2 border-[#fbfdec] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop" alt="user" />
                  <img className="w-6 h-6 rounded-full border-2 border-[#fbfdec] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop" alt="user" />
                  <div className="w-6 h-6 rounded-full border-2 border-[#fbfdec] bg-yellow-100 text-yellow-800 text-[9px] font-bold flex items-center justify-center">2+</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
                <span className="bg-slate-200/60 px-2.5 py-1 rounded-lg text-slate-700">Visual</span>
                <span className="bg-amber-100/80 text-amber-800 px-2.5 py-1 rounded-lg flex items-center gap-1">P2 🏆</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> 5</span>
                <span className="flex items-center gap-1"><Paperclip className="w-3.5 h-3.5" /> 3</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TimelineSchedule;