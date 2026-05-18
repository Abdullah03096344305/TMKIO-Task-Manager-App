'use client';

import React, { useState, useEffect } from 'react';
import { X, Trash2, PlusCircle } from 'lucide-react';

const initialProjectState = {
  title: '',
  description: '',
  status: 'Active',
  progress: 0,
  members_count: 1,
  company: '',
  category: '',
  start_date: '',
  end_date: '',
};

const ProjectFormModal = ({ isOpen, onClose, project, onSave, onDelete, isSaving }) => {
  const [values, setValues] = useState(initialProjectState);

  useEffect(() => {
    if (project) {
      setValues({
        title: project.title || '',
        description: project.description || '',
        status: project.status || 'Active',
        progress: project.progress ?? 0,
        members_count: project.members_count ?? 1,
        company: project.company || '',
        category: project.category || '',
        start_date: project.start_date ? project.start_date.split('T')[0] : '',
        end_date: project.end_date ? project.end_date.split('T')[0] : '',
      });
    } else {
      setValues(initialProjectState);
    }
  }, [project]);

  if (!isOpen) return null;

  const handleChange = (field) => (event) => {
    const value = field === 'progress' || field === 'members_count' ? Number(event.target.value) : event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSave(values);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-[#0f1425] shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 px-6 py-5">
          <div>
            <p className="text-sm text-slate-400">{project ? 'Edit Project' : 'Add New Project'}</p>
            <h2 className="text-2xl font-semibold text-white">Project details</h2>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2 text-sm text-slate-300">
              Title
              <input
                type="text"
                value={values.title}
                onChange={handleChange('title')}
                required
                className="w-full rounded-2xl border border-slate-800 bg-[#121420] px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-300">
              Status
              <select
                value={values.status}
                onChange={handleChange('status')}
                className="w-full rounded-2xl border border-slate-800 bg-[#121420] px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
              >
                <option>Active</option>
                <option>On-hold</option>
                <option>Completed</option>
                <option>Planning</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2 text-sm text-slate-300">
              Company
              <input
                type="text"
                value={values.company}
                onChange={handleChange('company')}
                className="w-full rounded-2xl border border-slate-800 bg-[#121420] px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-300">
              Category
              <input
                type="text"
                value={values.category}
                onChange={handleChange('category')}
                className="w-full rounded-2xl border border-slate-800 bg-[#121420] px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm text-slate-300">
            Description
            <textarea
              value={values.description}
              onChange={handleChange('description')}
              rows={4}
              className="w-full rounded-2xl border border-slate-800 bg-[#121420] px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="space-y-2 text-sm text-slate-300">
              Progress (%)
              <input
                type="number"
                min={0}
                max={100}
                value={values.progress}
                onChange={handleChange('progress')}
                className="w-full rounded-2xl border border-slate-800 bg-[#121420] px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-300">
              Team size
              <input
                type="number"
                min={1}
                value={values.members_count}
                onChange={handleChange('members_count')}
                className="w-full rounded-2xl border border-slate-800 bg-[#121420] px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
              />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="space-y-2 text-sm text-slate-300">
                Start
                <input
                  type="date"
                  value={values.start_date}
                  onChange={handleChange('start_date')}
                  className="w-full rounded-2xl border border-slate-800 bg-[#121420] px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-300">
                End
                <input
                  type="date"
                  value={values.end_date}
                  onChange={handleChange('end_date')}
                  className="w-full rounded-2xl border border-slate-800 bg-[#121420] px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#5f47ff] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4c36e0] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <PlusCircle className="w-4 h-4" />
                {project ? 'Save Project' : 'Create Project'}
              </button>
              {project && (
                <button
                  type="button"
                  onClick={() => onDelete(project)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-[#171c2f] px-5 py-3 text-sm font-semibold text-rose-400 transition hover:border-rose-500 hover:text-rose-200"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              )}
            </div>
            <p className="text-sm text-slate-400">Project details are saved to Supabase.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;
