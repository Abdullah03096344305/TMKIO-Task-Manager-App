'use client';

import React, { useEffect, useState } from 'react';
import {
  User,
  Monitor,
  Shield,
  Users,
  Save,
  Camera,
  ChevronDown,
  UserPlus,
  Loader2,
} from 'lucide-react';

import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const subTabs = [
  { id: 'profile', label: 'Profile Settings', icon: User },
  { id: 'preferences', label: 'Preferences', icon: Monitor },
  { id: 'account', label: 'Account Management', icon: Shield },
  { id: 'team', label: 'Team & Permissions', icon: Users },
];

const SettingsView = () => {
  const { user } = useUser();

  const clerkUserId = user?.id;

  const [activeSubTab, setActiveSubTab] = useState('profile');

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Profile
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  // Preferences
  const [themeMode, setThemeMode] = useState(true);
  const [language, setLanguage] = useState('English');
  const [taskNotifications, setTaskNotifications] = useState(true);
  const [defaultTaskView, setDefaultTaskView] = useState('Kanban');

  // Account
  const [twoFactor, setTwoFactor] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState([]);

  // Team
  const [teamPermissions, setTeamPermissions] = useState([]);

  useEffect(() => {
    if (!clerkUserId) return;

    fetchProfile();
    fetchSessions();
    fetchWorkspaceMembers();
  }, [clerkUserId]);

  useEffect(() => {
    const channel = supabase
      .channel('workspace-members-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workspace_members',
        },
        () => {
          fetchWorkspaceMembers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('clerk_user_id', clerkUserId)
      .single();

    if (error) {
      toast.error('Failed to load profile');
      return;
    }

    setFullName(data.full_name || '');
    setEmail(data.email || '');
    setAvatarUrl(data.avatar_url || '');
    setLanguage(data.language || 'English');
    setThemeMode(data.theme === 'dark');
    setTaskNotifications(data.notifications_enabled);
    setDefaultTaskView(data.default_task_view || 'Kanban');
    setTwoFactor(data.two_factor_enabled);
  };

  const fetchSessions = async () => {
    const { data, error } = await supabase
      .from('user_sessions')
      .select('*')
      .eq('clerk_user_id', clerkUserId);

    if (!error && data) {
      setConnectedDevices(data);
    }
  };

  const fetchWorkspaceMembers = async () => {
    const { data, error } = await supabase
      .from('workspace_members')
      .select('*');

    if (!error && data) {
      setTeamPermissions(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        email,
        language,
        theme: themeMode ? 'dark' : 'light',
        notifications_enabled: taskNotifications,
        default_task_view: defaultTaskView,
        two_factor_enabled: twoFactor,
      })
      .eq('clerk_user_id', clerkUserId);

    setLoading(false);

    if (error) {
      toast.error('Failed to save settings');
      return;
    }

    toast.success('Settings updated');
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setUploading(true);

    const filePath = `${clerkUserId}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      toast.error('Upload failed');
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    await supabase
      .from('profiles')
      .update({
        avatar_url: publicUrl,
      })
      .eq('clerk_user_id', clerkUserId);

    setAvatarUrl(publicUrl);

    setUploading(false);

    toast.success('Avatar updated');
  };

  const handleRemoveDevice = async (id) => {
    setConnectedDevices((prev) =>
      prev.filter((device) => device.id !== id)
    );

    await supabase
      .from('user_sessions')
      .delete()
      .eq('id', id);

    toast.success('Device removed');
  };

  const handleRoleChange = async (id, role) => {
    setTeamPermissions((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, role } : member
      )
    );

    const { error } = await supabase
      .from('workspace_members')
      .update({ role })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update role');
    }
  };

  const toggleTwoFactor = async () => {
    try {
      if (!twoFactor) {
        await user.createTOTP();
        setTwoFactor(true);
      } else {
        await user.disableTOTP();
        setTwoFactor(false);
      }

      toast.success('Two-factor authentication updated');
    } catch (err) {
      toast.error('Failed to update 2FA');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto animate-fadeIn select-none">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        
        {/* Sidebar */}
        <div className="bg-[#181b2a] border border-slate-800/60 rounded-2xl p-3 flex flex-col gap-1">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-[#24293e] text-[#6366f1]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main */}
        <div className="md:col-span-3 bg-[#181b2a] border border-slate-800/60 rounded-2xl overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-6 min-h-[500px]">

              {/* PROFILE */}
              {activeSubTab === 'profile' && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-white text-lg font-bold">
                    Profile Settings
                  </h3>

                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={
                          avatarUrl ||
                          user?.imageUrl ||
                          'https://via.placeholder.com/150'
                        }
                        alt="avatar"
                        className="w-16 h-16 rounded-full object-cover"
                      />

                      <label
                        htmlFor="avatarUpload"
                        className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-500 p-1.5 rounded-full cursor-pointer"
                      >
                        {uploading ? (
                          <Loader2 className="w-3 h-3 animate-spin text-white" />
                        ) : (
                          <Camera className="w-3 h-3 text-white" />
                        )}
                      </label>

                      <input
                        id="avatarUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </div>

                    <div>
                      <p className="text-sm text-white font-semibold">
                        Change profile photo
                      </p>

                      <p className="text-xs text-slate-500">
                        JPG, PNG, GIF up to 1MB
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs text-slate-400">
                        Full Name
                      </label>

                      <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full mt-1 bg-[#121420] border border-slate-800 rounded-xl px-4 py-3 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400">
                        Email
                      </label>

                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mt-1 bg-[#121420] border border-slate-800 rounded-xl px-4 py-3 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PREFERENCES */}
              {activeSubTab === 'preferences' && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-white text-lg font-bold">
                    Preferences
                  </h3>

                  <div className="space-y-6">

                    <div className="flex items-center justify-between">
                      <span className="text-white">
                        Dark Mode
                      </span>

                      <button
                        type="button"
                        onClick={() => setThemeMode(!themeMode)}
                        className={`w-10 h-5 rounded-full transition ${
                          themeMode
                            ? 'bg-indigo-600'
                            : 'bg-slate-700'
                        }`}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white">
                        Language
                      </span>

                      <div className="relative">
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="appearance-none bg-[#121420] border border-slate-800 rounded-xl px-4 py-2 text-white"
                        >
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </select>

                        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white">
                        Task Notifications
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setTaskNotifications(!taskNotifications)
                        }
                        className={`w-10 h-5 rounded-full transition ${
                          taskNotifications
                            ? 'bg-indigo-600'
                            : 'bg-slate-700'
                        }`}
                      />
                    </div>

                  </div>
                </div>
              )}

              {/* ACCOUNT */}
              {activeSubTab === 'account' && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-white text-lg font-bold">
                    Account Management
                  </h3>

                  <div className="bg-[#121420] border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">
                        Two-Factor Authentication
                      </p>

                      <p className="text-xs text-slate-500">
                        Secure your account
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={toggleTwoFactor}
                      className={`w-10 h-5 rounded-full transition ${
                        twoFactor
                          ? 'bg-indigo-600'
                          : 'bg-slate-700'
                      }`}
                    />
                  </div>

                  <div>
                    <p className="text-xs uppercase text-slate-500 mb-3">
                      Connected Devices
                    </p>

                    <div className="space-y-3">
                      {connectedDevices.map((device) => (
                        <div
                          key={device.id}
                          className="bg-[#121420] border border-slate-800 rounded-xl p-4 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-white font-medium">
                              {device.device_name}
                            </p>

                            <p className="text-xs text-slate-500">
                              Last active:{' '}
                              {new Date(
                                device.last_active
                              ).toLocaleString()}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveDevice(device.id)
                            }
                            className="text-rose-500 text-sm font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TEAM */}
              {activeSubTab === 'team' && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-white text-lg font-bold">
                    Team & Permissions
                  </h3>

                  <div className="space-y-3">
                    {teamPermissions.map((member) => (
                      <div
                        key={member.id}
                        className="bg-[#121420] border border-slate-800 rounded-xl p-4 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-white font-semibold">
                            {member.full_name || member.email}
                          </p>

                          <p className="text-xs text-slate-500">
                            {member.email}
                          </p>
                        </div>

                        <div className="relative">
                          <select
                            value={member.role}
                            onChange={(e) =>
                              handleRoleChange(
                                member.id,
                                e.target.value
                              )
                            }
                            className="appearance-none bg-[#181b2a] border border-slate-800 rounded-xl px-4 py-2 text-white"
                          >
                            <option value="Admin">Admin</option>
                            <option value="Member">Member</option>
                            <option value="Viewer">Viewer</option>
                          </select>

                          <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="w-full border border-dashed border-slate-700 rounded-xl py-3 text-slate-400 hover:text-white flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Invite Team Member
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-[#141624] border-t border-slate-800 px-6 py-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}

                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;