'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';

import {
  Plus,
  Trash2,
  Circle,
  Calendar,
  X,
  Briefcase,
} from 'lucide-react';

const TasksView = () => {
  const { userId } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  // Loading
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form States
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // ----------------------------------------
  // FETCH TASKS
  // ----------------------------------------

  useEffect(() => {
    if (!userId) return;

    fetchTasks();

    const channel = supabase
      .channel('tasks-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
        },
        () => {
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const fetchTasks = async () => {
  setLoading(true);

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('FETCH TASKS ERROR:', error);
  }

  if (data) {
    console.log('ALL TASKS:', data);
    setTasks(data);
  }

  setLoading(false);
};

  // ----------------------------------------
  // CREATE TASK
  // ----------------------------------------

 const handleCreateTask = async (e) => {
  e.preventDefault();

  if (!newTitle.trim()) return;

  if (!userId) {
    alert('User not authenticated');
    return;
  }

  const taskPayload = {
    title: newTitle,
    description: newDesc,
    user_id: userId,
  };

  const { error } = await supabase
    .from('tasks')
    .insert([taskPayload]);

  if (error) {
    console.error(error);
    return;
  }

  // REFRESH FULL DATASET
  await fetchTasks();

  // Reset
  setNewTitle('');
  setNewDesc('');
  setIsModalOpen(false);
};

  // ----------------------------------------
  // DELETE TASK
  // ----------------------------------------

  const handleDeleteTask = async (id) => {
    const oldTasks = tasks;

    setTasks((prev) => prev.filter((task) => task.id !== id));

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(error);
      setTasks(oldTasks);
    }
  };

  // ----------------------------------------
  // FILTER TASKS
  // ----------------------------------------

  const filteredTasks =
    filterStatus === 'All'
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

  // ----------------------------------------
  // UI
  // ----------------------------------------

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn select-none text-slate-200">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/40 pb-5">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Project Tasks
          </h2>

          <p className="text-xs text-slate-400 mt-0.5 font-medium">
            Logged in as:{' '}
            <span className="text-indigo-400 font-mono">
              {userId || 'Loading...'}
            </span>
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#5f47ff] hover:bg-[#4c36e0] text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-md shadow-indigo-950/40 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          Create Ticket Task
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

        {/* Sidebar */}
        <div className="bg-[#181b2a] border border-slate-800/60 rounded-2xl p-3 flex flex-col gap-1">

          {['All'].map((status) => {
            const count = tasks.length;
            const isActive = filterStatus === status;

            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 ${
                  isActive
                    ? 'bg-[#24293e] text-[#6366f1] border border-indigo-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>All Tasks</span>
                </div>

                <span
                  className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'bg-slate-800/80 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tasks */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">

          {loading ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <span className="text-sm text-slate-500">
                Loading tasks...
              </span>
            </div>
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-gradient-to-br from-[#1d2238] to-[#16192b] border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-5 relative group transition-all duration-200 hover:border-slate-700/80"
              >
                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-start gap-2.5 min-w-0">
                    <button className="text-slate-500 mt-0.5 transition-colors flex-shrink-0">
                      <Circle className="w-4 h-4 text-slate-600" />
                    </button>

                    <h4 className="text-sm font-bold tracking-wide text-white group-hover:text-indigo-400 transition-colors truncate">
                      {task.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-slate-600 hover:text-rose-400 p-1 rounded-lg hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-all duration-150 flex-shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-medium line-clamp-2">
                  {task.description || 'No description provided.'}
                </p>

                <div className="flex items-center justify-between gap-2 border-t border-slate-800/60 pt-3.5 mt-auto">

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                    TASK
                  </span>

                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
                    <Calendar className="w-3 h-3 text-slate-600" />

                    <span>
                      {new Date(task.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-[#181b2a] border border-dashed border-slate-800/80 rounded-2xl p-12 flex flex-col items-center justify-center text-center">

              <div className="w-12 h-12 bg-slate-800/40 border border-slate-800 rounded-xl flex items-center justify-center text-slate-500 mb-3">
                <Briefcase className="w-5 h-5 stroke-[1.5]" />
              </div>

              <h4 className="text-xs font-bold text-slate-300">
                No active tasks found
              </h4>

              <p className="text-[11px] text-slate-500 max-w-xs mt-1 leading-relaxed">
                Create a task to see it reflected in your dataset.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CREATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">

          <div className="w-full max-w-md bg-[#1e2235] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-200">

            <div className="flex items-center justify-between p-4 border-b border-slate-800/80">
              <h3 className="text-sm font-bold text-white tracking-wide">
                Create New Task
              </h3>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleCreateTask}
              className="p-4 flex flex-col gap-4"
            >

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Task Title
                </label>

                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Task title..."
                  className="w-full bg-[#121420] text-slate-200 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-xs font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                  Description
                </label>

                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Outline details..."
                  className="w-full bg-[#121420] text-slate-200 p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-xs font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 mt-2 border-t border-slate-800/60 pt-3.5">

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700/80 text-slate-400 px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#5f47ff] hover:bg-[#4c36e0] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-indigo-950/40"
                >
                  Save Task
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksView;