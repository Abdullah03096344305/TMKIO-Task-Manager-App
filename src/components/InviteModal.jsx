'use client';

import React, { useState } from 'react';
import { X, UserPlus, CheckCircle, AlertCircle, User, Briefcase } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const InviteModal = ({ isOpen, onClose, onInviteSuccess }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('Member');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAddMember = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('Starting to add member:', { name, role });

      if (!name.trim()) {
        throw new Error('Name is required');
      }

      // Check if user exists
      const { data: existingUser, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .ilike('full_name', name.trim())
        .maybeSingle();

      if (fetchError) {
        console.error('Fetch error:', fetchError);
        throw new Error(`Database error: ${fetchError.message}`);
      }

      if (existingUser) {
        throw new Error('A user with this name already exists.');
      }

      // Create a valid clerk_user_id (temporary)
      const tempId = `temp_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      console.log('Creating profile with ID:', tempId);

      // Add member directly
      const { data: insertedData, error: insertError } = await supabase
        .from('profiles')
        .insert({
          full_name: name.trim(),
          role: role,
          status: 'offline',
          clerk_user_id: tempId,
          avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=5f47ff&color=fff`,
        })
        .select();

      if (insertError) {
        console.error('Insert error details:', insertError);
        console.error('Error message:', insertError.message);
        console.error('Error code:', insertError.code);
        console.error('Error details:', insertError.details);
        throw new Error(`Failed to insert: ${insertError.message}`);
      }

      console.log('Successfully added member:', insertedData);
      setSuccess(`✓ ${name} has been added to the team!`);
      
      setTimeout(() => {
        onClose();
        if (onInviteSuccess) onInviteSuccess();
        setName('');
        setRole('Member');
        setSuccess('');
      }, 1500);
      
    } catch (err) {
      console.error('Full error object:', err);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
      setError(err.message || 'Failed to add member. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#181b2a] border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#5f47ff]/10 rounded-xl">
              <UserPlus className="w-5 h-5 text-[#5f47ff]" />
            </div>
            <h2 className="text-xl font-bold text-white">Add Team Member</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleAddMember} className="p-6 space-y-5">
          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <p className="text-sm text-emerald-400">{success}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </div>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#121420] text-slate-200 px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Role
              </div>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#121420] text-slate-200 px-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
            >
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#5f47ff] hover:bg-[#4c36e0] text-white font-medium py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Adding Member...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Add Member
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteModal;