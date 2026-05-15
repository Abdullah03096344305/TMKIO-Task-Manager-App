'use client';

import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { useEffect } from 'react';

export default function TaskList() {
  const { tasks, filter } = useSelector((state) => state.tasks);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  if (!filteredTasks.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 rounded-3xl border border-dashed border-slate-800 bg-slate-900/20">
        <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
          <svg 
            className="w-8 h-8 text-slate-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-slate-400 font-medium text-lg">
          No tasks match your filter.
        </p>
        <p className="text-slate-600 text-sm">
          Time to relax or start something new.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Current Roadmap
        </h2>
        <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-md border border-emerald-500/20">
          {filteredTasks.length} {filteredTasks.length === 1 ? 'Task' : 'Tasks'}
        </span>
      </div>
      
      <div className="grid gap-3">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}