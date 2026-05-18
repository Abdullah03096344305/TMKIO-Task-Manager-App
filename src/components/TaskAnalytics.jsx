'use client';

import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

// Main Line Chart Mock Data
const lineData = [
  { name: 'May', current: 40, previous: 20 },
  { name: 'Jun', current: 150, previous: 120 },
  { name: 'Jul', current: 280, previous: 200 },
  { name: 'Aug', current: 380, previous: 340 },
  { name: 'Sep', current: 240, previous: 250 },
  { name: 'Oct', current: 260, previous: 180 },
  { name: 'Nov', current: 120, previous: 140 },
  { name: 'Dec', current: 160, previous: 80 },
  { name: 'Jan', current: 310, previous: 240 },
  { name: 'Feb', current: 380, previous: 280 },
  { name: 'Mar', current: 280, previous: 180 },
  { name: 'Apr', current: 80, previous: 110 },
];

// Donut Chart Mock Data
const pieData = [
  { name: 'To Do', value: 33, color: '#f59e0b' },
  { name: 'In Progress', value: 33, color: '#3b82f6' },
  { name: 'Done', value: 34, color: '#10b981' },
];

const TaskAnalytics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Area Chart Card */}
      <div className="lg:col-span-2 bg-[#181b2a] border border-slate-800/60 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white font-semibold text-lg">Task Done</h3>
          <div className="flex bg-[#121420] p-1 rounded-xl text-xs font-medium text-slate-400">
            <button className="px-3 py-1.5 rounded-lg">Daily</button>
            <button className="px-3 py-1.5 rounded-lg">Weekly</button>
            <button className="px-3 py-1.5 bg-[#5f47ff] text-white rounded-lg">Monthly</button>
          </div>
        </div>

        <div className="w-full h-64 text-[11px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5f47ff" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#5f47ff" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPrev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#1e2235" />
              <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" axisLine={false} tickLine={false} domain={[0, 400]} ticks={[0, 100, 200, 300, 400]} />
              <Tooltip contentStyle={{ backgroundColor: '#121420', borderColor: '#334155', color: '#fff' }} />
              <Area type="monotone" dataKey="current" stroke="#5f47ff" strokeWidth={3} fillOpacity={1} fill="url(#colorCurrent)" dot={{ r: 4, stroke: '#5f47ff', strokeWidth: 2, fill: '#181b2a' }} />
              <Area type="monotone" dataKey="previous" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorPrev)" dot={{ r: 3, stroke: '#06b6d4', strokeWidth: 2, fill: '#181b2a' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donut Chart Card */}
      <div className="bg-[#181b2a] border border-slate-800/60 rounded-2xl p-6 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-semibold text-base">Task Status Overview</h3>
        </div>

        {/* Center Donut Graphic */}
        <div className="relative w-full h-40 flex items-center justify-center my-2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={62}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Exact Absolute Overlay Labels for Ring Percentages */}
          <span className="absolute top-[20%] right-[15%] text-[10px] text-amber-500 font-medium">To Do: 33%</span>
          <span className="absolute bottom-[24%] left-[12%] text-[10px] text-blue-500 font-medium">Progress: 33%</span>
          <span className="absolute bottom-[16%] right-[14%] text-[10px] text-emerald-500 font-medium">Done: 33%</span>
        </div>

        {/* Bottom Metrics Ledger */}
        <div>
          <div className="flex justify-center gap-4 text-xs text-slate-400 mb-6">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-amber-500"></span> To Do
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-blue-500"></span> In Progress
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-emerald-500"></span> Done
            </div>
          </div>

          <div className="grid grid-cols-3 text-center border-t border-slate-800/60 pt-4">
            <div>
              <p className="text-xl font-bold text-white">2</p>
              <p className="text-[10px] text-slate-400 mt-0.5">To Do</p>
            </div>
            <div className="border-x border-slate-800/60">
              <p className="text-xl font-bold text-white">2</p>
              <p className="text-[10px] text-slate-400 mt-0.5">In Progress</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">2</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Done</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default TaskAnalytics;   