'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask, toggleComplete } from '@/redux/taskSlice';
import StatusBadge from './StatusBadge';

export default function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEdit = () => {
    if (!newTitle.trim()) return;
    dispatch(editTask({ id: task.id, title: newTitle }));
    setEditing(false);
  };

  const handleDelete = () => {
    // Custom logic could replace window.confirm for a better UI, 
    // but keeping it functional for now.
    if (window.confirm('Delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  return (
    <div className={`group relative mb-4 p-5 rounded-2xl transition-all duration-300 border ${
      task.completed 
      ? 'bg-slate-900/40 border-slate-800' 
      : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.1)]'
    } flex items-center justify-between`}>
      
      <div className="flex items-center gap-5 flex-1">
        {/* Custom Emerald Checkbox */}
        <div className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(toggleComplete(task.id))}
            className="peer h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-slate-700 bg-transparent transition-all checked:border-emerald-500 checked:bg-emerald-500"
          />
          <span className="absolute text-slate-950 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
          </span>
        </div>

        {editing ? (
          <input
            type="text"
            autoFocus
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
            className="bg-slate-800 border border-emerald-500/50 text-white px-4 py-2 rounded-xl flex-1 outline-none ring-2 ring-emerald-500/10"
          />
        ) : (
          <div className="flex flex-col gap-1">
            <p className={`text-lg font-medium transition-all duration-300 ${
              task.completed ? 'text-slate-500 line-through' : 'text-slate-100'
            }`}>
              {task.title}
            </p>
            <StatusBadge completed={task.completed} />
          </div>
        )}
      </div>

      <div className="flex gap-3 ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {editing ? (
          <button
            onClick={handleEdit}
            className="bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-xl hover:bg-emerald-400 transition-colors"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-slate-400 hover:text-emerald-400 p-2 transition-colors"
            title="Edit Task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
        )}

        <button
          onClick={handleDelete}
          className="text-slate-400 hover:text-red-500 p-2 transition-colors"
          title="Delete Task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
      </div>
    </div>
  );
}