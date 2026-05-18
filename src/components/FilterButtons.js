'use client';

import { useDispatch, useSelector } from 'react-redux';
import { filterTasks } from '@/redux/taskSlice';

export default function FilterButtons() {
  const dispatch = useDispatch();
  // Assuming your slice state has a 'filter' property
  const currentFilter = useSelector((state) => state.tasks.filter);

  const filters = [
    { id: 'all', label: 'All Tasks' },
    { id: 'completed', label: 'Completed' },
    { id: 'incomplete', label: 'Pending' },
  ];

  return (
    <div className="flex p-1.5 gap-1 mb-8 w-fit mx-auto bg-slate-900/50 border border-slate-800 rounded-2xl backdrop-blur-sm">
      {filters.map((filter) => {
        const isActive = currentFilter === filter.id;
        
        return (
          <button
            key={filter.id}
            onClick={() => dispatch(filterTasks(filter.id))}
            className={`
              relative px-6 py-2 text-sm font-bold rounded-xl transition-all duration-300
              ${isActive 
                ? 'text-emerald-400 bg-emerald-500/10 shadow-[0_0_15px_-5px_rgba(16,185,129,0.3)]' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
              }
            `}
          >
            {/* Active Indicator Line */}
            {isActive && (
              <span className="absolute inset-x-0 -bottom-1 mx-auto w-1/2 h-0.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            )}
            
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}