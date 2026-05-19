'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useUser } from "@clerk/nextjs";
import { supabase } from '@/lib/supabase';

import {
  Plus,
  Trash2,
  Circle,
  Calendar,
  X,
  Briefcase,
  User,
  CheckCircle2,
  Clock,
  Sparkles,
  Filter,
  Edit2,
  Save,
  AlertCircle,
  Check,
  Loader2,
  TrendingUp,
  Flag,
  ArrowUp,
  Minus,
  ArrowDown,
} from 'lucide-react';

const TasksView = () => {
  const { userId } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();
  
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [sortBy, setSortBy] = useState('created_at'); // created_at, priority, title
  const [sortOrder, setSortOrder] = useState('desc'); // asc, desc
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Form States
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newStatus, setNewStatus] = useState('pending');
  const [newPriority, setNewPriority] = useState('medium');
  
  // Toast Notification
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  if (!isLoaded || !isSignedIn) return null;

  // Priority colors and labels
  const priorityConfig = {
    high: { 
      label: 'HIGH', 
      color: 'text-rose-400', 
      bg: 'bg-rose-500/10', 
      border: 'border-rose-500/20',
      icon: ArrowUp,
      order: 3
    },
    medium: { 
      label: 'MEDIUM', 
      color: 'text-amber-400', 
      bg: 'bg-amber-500/10', 
      border: 'border-amber-500/20',
      icon: Minus,
      order: 2
    },
    low: { 
      label: 'LOW', 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10', 
      border: 'border-emerald-500/20',
      icon: ArrowDown,
      order: 1
    }
  };

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

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
          filter: `user_id=eq.${userId}`,
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
      showToast('Failed to fetch tasks', 'error');
    }

    if (data) {
      setTasks(data);
    }
    setLoading(false);
  };

  // ----------------------------------------
  // CREATE TASK
  // ----------------------------------------
  const handleCreateTask = async (e) => {
    e.preventDefault();
    
    if (!newTitle.trim()) {
      showToast('Please enter a task title', 'error');
      return;
    }

    if (!userId) {
      showToast('User not authenticated', 'error');
      return;
    }

    setActionLoading(true);

    const taskPayload = {
      title: newTitle,
      description: newDesc || null,
      user_id: userId,
      status: newStatus,
      priority: newPriority,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('tasks')
      .insert([taskPayload])
      .select();

    if (error) {
      console.error('CREATE ERROR:', error);
      showToast('Failed to create task', 'error');
      setActionLoading(false);
      return;
    }

    if (data) {
      setTasks([data[0], ...tasks]);
      showToast('Task created successfully!', 'success');
    }

    // Reset form
    setNewTitle('');
    setNewDesc('');
    setNewStatus('pending');
    setNewPriority('medium');
    setIsModalOpen(false);
    setActionLoading(false);
  };

  // ----------------------------------------
  // UPDATE TASK
  // ----------------------------------------
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    
    if (!newTitle.trim()) {
      showToast('Please enter a task title', 'error');
      return;
    }

    setActionLoading(true);

    const updates = {
      title: newTitle,
      description: newDesc || null,
      status: newStatus,
      priority: newPriority,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', editingTask.id)
      .select();

    if (error) {
      console.error('UPDATE ERROR:', error);
      showToast('Failed to update task', 'error');
      setActionLoading(false);
      return;
    }

    if (data) {
      setTasks(tasks.map(task => task.id === editingTask.id ? data[0] : task));
      showToast('Task updated successfully!', 'success');
    }

    // Reset form and close modal
    setEditingTask(null);
    setNewTitle('');
    setNewDesc('');
    setNewStatus('pending');
    setNewPriority('medium');
    setIsModalOpen(false);
    setActionLoading(false);
  };

  // ----------------------------------------
  // UPDATE TASK PRIORITY
  // ----------------------------------------
  const handleUpdatePriority = async (task, newPriority) => {
    const oldTasks = [...tasks];
    
    // Optimistic update
    setTasks(tasks.map(t => 
      t.id === task.id ? { ...t, priority: newPriority } : t
    ));

    const { error } = await supabase
      .from('tasks')
      .update({ 
        priority: newPriority,
        updated_at: new Date().toISOString()
      })
      .eq('id', task.id);

    if (error) {
      console.error('PRIORITY UPDATE ERROR:', error);
      setTasks(oldTasks);
      showToast('Failed to update priority', 'error');
    } else {
      showToast(`Priority updated to ${newPriority}`, 'success');
    }
  };

  // ----------------------------------------
  // TOGGLE TASK STATUS
  // ----------------------------------------
  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    const oldTasks = [...tasks];
    
    // Optimistic update
    setTasks(tasks.map(t => 
      t.id === task.id ? { ...t, status: newStatus } : t
    ));

    const { error } = await supabase
      .from('tasks')
      .update({ 
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', task.id);

    if (error) {
      console.error('STATUS UPDATE ERROR:', error);
      setTasks(oldTasks);
      showToast('Failed to update task status', 'error');
    } else {
      showToast(`Task marked as ${newStatus}`, 'success');
    }
  };

  // ----------------------------------------
  // DELETE TASK
  // ----------------------------------------
  const handleDeleteTask = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    const oldTasks = [...tasks];
    setTasks(tasks.filter((task) => task.id !== id));

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('DELETE ERROR:', error);
      setTasks(oldTasks);
      showToast('Failed to delete task', 'error');
    } else {
      showToast('Task deleted successfully', 'success');
    }
  };

  // ----------------------------------------
  // OPEN EDIT MODAL
  // ----------------------------------------
  const openEditModal = (task) => {
    setEditingTask(task);
    setNewTitle(task.title);
    setNewDesc(task.description || '');
    setNewStatus(task.status || 'pending');
    setNewPriority(task.priority || 'medium');
    setIsModalOpen(true);
  };

  // ----------------------------------------
  // OPEN CREATE MODAL
  // ----------------------------------------
  const openCreateModal = () => {
    setEditingTask(null);
    setNewTitle('');
    setNewDesc('');
    setNewStatus('pending');
    setNewPriority('medium');
    setIsModalOpen(true);
  };

  // ----------------------------------------
  // FILTER AND SORT TASKS
  // ----------------------------------------
  const getFilteredAndSortedTasks = () => {
    let filtered = tasks;
    
    // Apply status filter
    if (filterStatus !== 'All') {
      filtered = filtered.filter((task) => task.status === filterStatus);
    }
    
    // Apply priority filter
    if (filterPriority !== 'All') {
      filtered = filtered.filter((task) => task.priority === filterPriority);
    }
    
    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const aOrder = priorityOrder[a.priority || 'medium'];
        const bOrder = priorityOrder[b.priority || 'medium'];
        return sortOrder === 'desc' ? bOrder - aOrder : aOrder - bOrder;
      } else if (sortBy === 'title') {
        const comparison = (a.title || '').localeCompare(b.title || '');
        return sortOrder === 'desc' ? -comparison : comparison;
      } else {
        // created_at
        const aDate = new Date(a.created_at);
        const bDate = new Date(b.created_at);
        return sortOrder === 'desc' ? bDate - aDate : aDate - bDate;
      }
    });
    
    return filtered;
  };

  // ----------------------------------------
  // CALCULATE STATS
  // ----------------------------------------
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length;
  const mediumPriorityTasks = tasks.filter(t => t.priority === 'medium' && t.status !== 'completed').length;
  const lowPriorityTasks = tasks.filter(t => t.priority === 'low' && t.status !== 'completed').length;

  const filteredTasks = getFilteredAndSortedTasks();

  // ----------------------------------------
  // UI
  // ----------------------------------------
  return (
    <div className="w-full flex flex-col gap-8 animate-fadeIn select-none text-slate-200">
      
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slideIn">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${
            toast.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          } backdrop-blur-sm`}>
            {toast.type === 'success' ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full -z-10"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-tight">
                Task Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs text-slate-300 font-medium">
                  {`${user.firstName} ${user.lastName}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs text-slate-400">Active</span>
              </div>
            </div>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#5f47ff] to-[#7c66ff] hover:from-[#4c36e0] hover:to-[#6a53f0] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-950/30 hover:shadow-indigo-950/50 hover:scale-105 transform duration-200"
          >
            <Plus className="w-4 h-4" />
            Create Task
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-[#1d2238] to-[#16192b] border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/30 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Total Tasks</p>
              <p className="text-3xl font-bold text-white mt-2 group-hover:text-indigo-400 transition-colors">
                {tasks.length}
              </p>
            </div>
            <Briefcase className="w-8 h-8 text-indigo-500/60 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1d2238] to-[#16192b] border border-slate-800/80 rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Completed</p>
              <p className="text-3xl font-bold text-white mt-2 group-hover:text-emerald-400 transition-colors">
                {completedTasks}
              </p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-emerald-500/60 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1d2238] to-[#16192b] border border-slate-800/80 rounded-2xl p-5 hover:border-amber-500/30 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Pending</p>
              <p className="text-3xl font-bold text-white mt-2 group-hover:text-amber-400 transition-colors">
                {pendingTasks}
              </p>
            </div>
            <Clock className="w-8 h-8 text-amber-500/60 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1d2238] to-[#16192b] border border-slate-800/80 rounded-2xl p-5 hover:border-indigo-500/30 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Completion Rate</p>
              <p className="text-3xl font-bold text-white mt-2 group-hover:text-indigo-400 transition-colors">
                {completionRate}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-indigo-500/60 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>

      {/* Priority Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <ArrowUp className="w-3 h-3 text-rose-400" />
            <p className="text-[10px] font-bold text-rose-400 uppercase">High Priority</p>
          </div>
          <p className="text-2xl font-bold text-white">{highPriorityTasks}</p>
        </div>
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Minus className="w-3 h-3 text-amber-400" />
            <p className="text-[10px] font-bold text-amber-400 uppercase">Medium Priority</p>
          </div>
          <p className="text-2xl font-bold text-white">{mediumPriorityTasks}</p>
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <ArrowDown className="w-3 h-3 text-emerald-400" />
            <p className="text-[10px] font-bold text-emerald-400 uppercase">Low Priority</p>
          </div>
          <p className="text-2xl font-bold text-white">{lowPriorityTasks}</p>
        </div>
      </div>

      {/* Filter and Sort Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="w-4 h-4 text-indigo-400" />
          
          {/* Status Filters */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === 'All'
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              All ({tasks.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === 'pending'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              Pending ({pendingTasks})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === 'completed'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              Completed ({completedTasks})
            </button>
          </div>

          {/* Priority Filters */}
          <div className="w-px h-6 bg-slate-700"></div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterPriority('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterPriority === 'All'
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              All Priorities
            </button>
            <button
              onClick={() => setFilterPriority('high')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all text-rose-400 hover:bg-rose-500/10"
            >
              High
            </button>
            <button
              onClick={() => setFilterPriority('medium')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all text-amber-400 hover:bg-amber-500/10"
            >
              Medium
            </button>
            <button
              onClick={() => setFilterPriority('low')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all text-emerald-400 hover:bg-emerald-500/10"
            >
              Low
            </button>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#121420] text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-800 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="created_at">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="bg-[#121420] text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-800 hover:border-indigo-500 transition-all"
          >
            {sortOrder === 'desc' ? '↓ Newest First' : '↑ Oldest First'}
          </button>
        </div>
      </div>

      {/* Tasks Grid */}
      {loading ? (
        <div className="bg-gradient-to-br from-[#181b2a] to-[#121420] border border-dashed border-slate-800/80 rounded-2xl p-16 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mb-3" />
          <span className="text-sm text-slate-500">Loading tasks...</span>
        </div>
      ) : filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTasks.map((task) => {
            const priority = priorityConfig[task.priority || 'medium'];
            const PriorityIcon = priority.icon;
            
            return (
              <div
                key={task.id}
                className={`bg-gradient-to-br from-[#1d2238] to-[#16192b] border rounded-2xl p-5 flex flex-col gap-4 relative group transition-all duration-300 hover:shadow-xl ${
                  task.status === 'completed'
                    ? 'border-emerald-500/30 opacity-75'
                    : 'border-slate-800/80 hover:border-indigo-500/50 hover:-translate-y-1'
                }`}
              >
                {/* Priority Color Bar */}
                <div className={`absolute top-0 left-10 right-10 h-1 rounded-t-3xl ${
                  task.priority === 'high' ? 'bg-gradient-to-r from-rose-500 to-rose-500/20' :
                  task.priority === 'medium' ? 'bg-gradient-to-r from-amber-500 to-amber-500/20' :
                  'bg-gradient-to-r from-emerald-500 to-emerald-500/20'
                }`}></div>
                
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <button
                      onClick={() => handleToggleStatus(task)}
                      className="mt-0.5 flex-shrink-0 transition-all hover:scale-110"
                      disabled={actionLoading}
                    >
                      {task.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold tracking-wide break-words ${
                        task.status === 'completed' 
                          ? 'text-slate-500 line-through text-sm' 
                          : 'text-white group-hover:text-indigo-400 text-base transition-colors'
                      }`}>
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className={`text-xs text-slate-400 leading-relaxed mt-2 break-words ${
                          task.status === 'completed' ? 'line-through' : ''
                        }`}>
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => openEditModal(task)}
                      className="text-slate-600 hover:text-indigo-400 p-1.5 rounded-lg hover:bg-indigo-500/10 transition-all"
                      disabled={actionLoading}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-slate-600 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-all"
                      disabled={actionLoading}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-slate-800/60 pt-4 mt-auto">
                  <div className="flex items-center gap-2">
                    {/* Priority Badge with Change Option */}
                    <div className="relative group/priority">
                      <button
                        onClick={() => {
                          const priorities = ['high', 'medium', 'low'];
                          const currentIndex = priorities.indexOf(task.priority || 'medium');
                          const nextPriority = priorities[(currentIndex + 1) % priorities.length];
                          handleUpdatePriority(task, nextPriority);
                        }}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all hover:scale-105 ${priority.bg} ${priority.border}`}
                        disabled={actionLoading}
                      >
                        <PriorityIcon className={`w-3 h-3 ${priority.color}`} />
                        <span className={`text-[10px] font-bold ${priority.color}`}>
                          {priority.label}
                        </span>
                      </button>
                    </div>
                    
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${
                      task.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                    }`}>
                      {task.status === 'completed' ? 'COMPLETED' : 'IN PROGRESS'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
                    <Calendar className="w-3 h-3 text-slate-600" />
                    <span>{new Date(task.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-[#181b2a] to-[#121420] border border-dashed border-slate-800/80 rounded-2xl p-16 flex flex-col items-center justify-center text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full"></div>
            <div className="relative w-16 h-16 bg-slate-800/60 border border-slate-700 rounded-2xl flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-slate-500 stroke-[1.5]" />
            </div>
          </div>
          <h4 className="text-sm font-bold text-slate-300 mb-1">No tasks found</h4>
          <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
            {filterStatus !== 'All' || filterPriority !== 'All'
              ? `No tasks match your filters. Try changing the filters.`
              : 'Get started by creating your first task using the button above.'}
          </p>
          {(filterStatus !== 'All' || filterPriority !== 'All') && (
            <button
              onClick={() => {
                setFilterStatus('All');
                setFilterPriority('All');
              }}
              className="mt-4 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Clear all filters →
            </button>
          )}
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-64 right-0 bottom-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md animate-fadeIn p-4">
          <div className="w-full max-w-md bg-gradient-to-br from-[#1e2235] to-[#16192b] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100">
            
            {/* Modal Header */}
            <div className="relative px-6 pt-6 pb-4 border-b border-slate-800/80">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-500/20"></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    {editingTask ? <Edit2 className="w-4 h-4 text-indigo-400" /> : <Sparkles className="w-4 h-4 text-indigo-400" />}
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    {editingTask ? 'Edit Task' : 'Create New Task'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/50 transition-all"
                  disabled={actionLoading}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={editingTask ? handleUpdateTask : handleCreateTask} className="p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter task title..."
                  className="w-full bg-[#121420] text-slate-200 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 text-sm font-medium transition-all placeholder:text-slate-600"
                  disabled={actionLoading}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
                  Description
                </label>
                <textarea
                  rows={4}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Add task details, requirements, or notes..."
                  className="w-full bg-[#121420] text-slate-200 p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 text-sm font-medium resize-none placeholder:text-slate-600"
                  disabled={actionLoading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
                    Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-[#121420] text-slate-200 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 text-sm font-medium transition-all cursor-pointer"
                    disabled={actionLoading}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full bg-[#121420] text-slate-200 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 text-sm font-medium transition-all cursor-pointer"
                    disabled={actionLoading}
                  >
                    <option value="high">🔴 High</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="low">🟢 Low</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-2 pt-4 border-t border-slate-800/60">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700/80 text-slate-400 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
                  disabled={actionLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-gradient-to-r from-[#5f47ff] to-[#7c66ff] hover:from-[#4c36e0] hover:to-[#6a53f0] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-950/40 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                >
                  {actionLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{editingTask ? 'Updating...' : 'Creating...'}</span>
                    </>
                  ) : (
                    <>
                      {editingTask ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      <span>{editingTask ? 'Update Task' : 'Create Task'}</span>
                    </>
                  )}
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