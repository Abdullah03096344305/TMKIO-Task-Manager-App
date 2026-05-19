'use client';

import React, { useEffect, useState } from 'react';
import { Save, RefreshCw, Folder, FileText, BarChart2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const FileSystemDashboardPanel = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchCurrentConfig();
  }, []);

  const fetchCurrentConfig = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('file_system_dashboard')
        .select('*')
        .eq('dashboard_key', 'default_user_dashboard')
        .single();

      if (error) throw error;
      setFormData(data);
    } catch (err) {
      showStatus('Error fetching schema metrics: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showStatus = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const handleNestedChange = (section, index, key, value, subIndex = null) => {
    setFormData((prev) => {
      const updatedSection = Array.isArray(prev[section])
        ? [...prev[section]]
        : { ...prev[section] };

      if (subIndex !== null) {
        updatedSection[key][index][subIndex] = value;
      } else if (index !== null) {
        if (typeof value === 'string' && key === 'tags') {
          updatedSection[index][key] = value
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);
        } else {
          updatedSection[index][key] = value;
        }
      } else {
        updatedSection[key] = value;
      }

      return { ...prev, [section]: updatedSection };
    });
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const { error } = await supabase
        .from('file_system_dashboard')
        .update({
          folders: formData.folders,
          recent_files: formData.recent_files,
          storage_overview: formData.storage_overview,
          chart_bars: formData.chart_bars,
          updated_at: new Date().toISOString(),
        })
        .eq('dashboard_key', 'default_user_dashboard');

      if (error) throw error;
      showStatus('Database matrix successfully synchronized!', 'success');
    } catch (err) {
      showStatus('Mutation failed: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <div className="rounded-3xl border border-slate-800/80 bg-slate-900/95 px-8 py-12 text-slate-300 shadow-[0_25px_75px_-45px_rgba(15,23,42,0.95)]">
          <div className="flex items-center gap-3 text-slate-100">
            <RefreshCw className="w-5 h-5 animate-spin text-indigo-400" />
            <span className="text-sm font-medium">Parsing live Supabase row schema...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.14),_transparent_35%),_linear-gradient(180deg,#020617_0%,#111827_55%,#0b1224_100%)] py-10">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-950/90 shadow-[0_40px_120px_-70px_rgba(15,23,42,0.95)] ring-1 ring-slate-700/60">
          <div className="flex flex-col gap-4 border-b border-slate-800/70 bg-slate-950/95 p-8 md:p-10">
        <div>
          <h1 className="text-xl font-black text-white tracking-wide">Workspace Matrix Engine</h1>
          <p className="text-xs text-slate-400 mt-1">Mutate single-row structural JSON configurations in real time.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end w-full md:w-auto">
          <button
            type="button"
            onClick={fetchCurrentConfig}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-700/70 bg-slate-900/95 px-4 py-2 text-slate-200 transition hover:border-indigo-500/60 hover:bg-slate-800/90"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleSaveChanges}
            disabled={saving}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_-18px_rgba(79,70,229,0.9)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Syncing...' : 'Save Component Modifications'}
          </button>
        </div>
      </div>

      {message.text && (
        <div
          className={`p-4 mb-6 rounded-xl text-xs font-bold border transition-all animate-fadeIn ${
            message.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-950/40 border-rose-500/30 text-rose-400'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSaveChanges} className="space-y-8">
        <div className="bg-[#181b2a] border border-slate-800/80 rounded-2xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800/60 pb-2">
            <Folder className="w-4 h-4 text-blue-500" /> Folders Layout Directory
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.folders.map((folder, index) => (
              <div key={index} className="bg-[#121420]/60 p-4 rounded-xl border border-slate-800/60 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Folder Name</label>
                    <input
                      type="text"
                      value={folder.name}
                      onChange={(e) => handleNestedChange('folders', index, 'name', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white font-medium outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">File Metric Label</label>
                    <input
                      type="text"
                      value={folder.count}
                      onChange={(e) => handleNestedChange('folders', index, 'count', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white font-medium outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tags (Comma Separated)</label>
                  <input
                    type="text"
                    value={folder.tags?.join(', ') || ''}
                    placeholder="e.g. A, B"
                    onChange={(e) => handleNestedChange('folders', index, 'tags', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white font-medium outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#181b2a] border border-slate-800/80 rounded-2xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800/60 pb-2">
            <FileText className="w-4 h-4 text-amber-500" /> Recent Files Dynamic Stream
          </h2>
          <div className="space-y-3">
            {formData.recent_files.map((file, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-[#121420]/60 p-3 rounded-xl border border-slate-800/60">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">File Name</label>
                  <input
                    type="text"
                    value={file.name}
                    onChange={(e) => handleNestedChange('recent_files', index, 'name', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white font-medium outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Data Weight (Size)</label>
                  <input
                    type="text"
                    value={file.size}
                    onChange={(e) => handleNestedChange('recent_files', index, 'size', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white font-medium outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Modified Date String</label>
                  <input
                    type="text"
                    value={file.date}
                    onChange={(e) => handleNestedChange('recent_files', index, 'date', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white font-medium outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">File Extension Mapping Type</label>
                  <select
                    value={file.type}
                    onChange={(e) => handleNestedChange('recent_files', index, 'type', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-2 text-xs text-white font-medium outline-none"
                  >
                    <option value="doc">Document (doc)</option>
                    <option value="image">Image (image)</option>
                    <option value="figma">Figma Blueprint (figma)</option>
                    <option value="vector">Vector Layer (vector)</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-[#181b2a] border border-slate-800/80 rounded-2xl p-6 h-fit space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800/60 pb-2">
              Global Storage Specs
            </h2>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Available Space</label>
              <input
                type="text"
                value={formData.storage_overview.available}
                onChange={(e) => handleNestedChange('storage_overview', null, 'available', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white font-medium outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Total Space Capacity</label>
              <input
                type="text"
                value={formData.storage_overview.total}
                onChange={(e) => handleNestedChange('storage_overview', null, 'total', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-3 py-1.5 text-xs text-white font-medium outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Radial Usage Percent ({formData.storage_overview.percentageUsed}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.storage_overview.percentageUsed}
                onChange={(e) => handleNestedChange('storage_overview', null, 'percentageUsed', parseInt(e.target.value))}
                className="w-full accent-[#5f47ff] mt-2"
              />
            </div>
          </div>

          <div className="md:col-span-2 bg-[#181b2a] border border-slate-800/80 rounded-2xl p-6 space-y-3">
            <h2 className="text-sm font-bold text-white border-b border-slate-800/60 pb-2">
              Linear Categorized Hardware Allocations
            </h2>
            {formData.storage_overview.categories.map((cat, index) => (
              <div key={index} className="grid grid-cols-3 gap-3 bg-[#121420]/60 p-3 rounded-xl border border-slate-800/60 items-center">
                <span className="text-xs font-bold text-white pl-1">{cat.label} Bar</span>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Assigned Size</label>
                  <input
                    type="text"
                    value={cat.size}
                    onChange={(e) => handleNestedChange('storage_overview', index, 'categories', e.target.value, 'size')}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-2.5 py-1 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Width Percentage ({cat.percentage}%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={cat.percentage}
                    onChange={(e) => handleNestedChange('storage_overview', index, 'categories', parseInt(e.target.value) || 0, 'percentage')}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-2.5 py-1 text-xs text-white outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#181b2a] border border-slate-800/80 rounded-2xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800/60 pb-2">
            <BarChart2 className="w-4 h-4 text-cyan-400" /> Analytical Column Segment Nodes
          </h2>
          <div className="grid grid-cols-5 gap-3">
            {formData.chart_bars.map((bar, index) => (
              <div key={index} className="bg-[#121420]/60 p-3 rounded-xl border border-slate-800/60 space-y-2">
                <div className="text-[10px] font-black text-center text-slate-500 border-b border-slate-800 pb-1">BAR #{index + 1}</div>
                <div>
                  <label className="text-[9px] font-bold text-cyan-400 block">Docs %</label>
                  <input
                    type="number"
                    value={bar.docs}
                    onChange={(e) => handleNestedChange('chart_bars', index, 'docs', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-md px-1.5 py-0.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-amber-400 block">Photos %</label>
                  <input
                    type="number"
                    value={bar.photos}
                    onChange={(e) => handleNestedChange('chart_bars', index, 'photos', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-md px-1.5 py-0.5 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-blue-400 block">Media %</label>
                  <input
                    type="number"
                    value={bar.media}
                    onChange={(e) => handleNestedChange('chart_bars', index, 'media', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-md px-1.5 py-0.5 text-xs text-white outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
        </div>
      </div>
    </div>
  );
};

export default FileSystemDashboardPanel;
