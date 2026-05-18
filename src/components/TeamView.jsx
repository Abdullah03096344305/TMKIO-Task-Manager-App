'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Search, UserPlus, Send, MessageSquare } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';
import InviteModal from './InviteModal';

const TeamView = () => {
  const { user } = useUser();

  const [membersData, setMembersData] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [activeMember, setActiveMember] = useState(null);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const bottomRef = useRef(null);
  const channelRef = useRef(null);

  // Fetch members
  const fetchMembers = useCallback(async () => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .neq('clerk_user_id', user.id);

    if (!error && data) {
      const formatted = data.map((member) => ({
        id: member.id,
        clerk_user_id: member.clerk_user_id,
        name: member.full_name || 'Team Member',
        role: member.role || 'Member',
        status: member.status || 'offline',
        avatar: member.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.full_name || 'User')}&background=5f47ff&color=fff`,
      }));

      setMembersData(formatted);
      setFilteredMembers(formatted);
    }
  }, [user?.id]);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    if (!activeMember || !user?.id) return;

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(
        `and(sender_id.eq.${user.id},receiver_id.eq.${activeMember.clerk_user_id}),and(sender_id.eq.${activeMember.clerk_user_id},receiver_id.eq.${user.id})`
      )
      .order('created_at', { ascending: true });

    if (!error && data) {
      setMessages(data);
      
      // Mark unread messages as read
      const unreadMessages = data.filter(
        msg => msg.receiver_id === user.id && !msg.is_read
      );
      
      if (unreadMessages.length > 0) {
        await supabase
          .from('messages')
          .update({ is_read: true })
          .in('id', unreadMessages.map(m => m.id));
      }
    }
  }, [activeMember, user?.id]);

  // Send message
  const sendMessage = async () => {
    if (!typedMessage.trim() || !activeMember || !user?.id) return;

    const messageText = typedMessage;
    setTypedMessage('');

    // Optimistic update
    const tempMessage = {
      id: Date.now(),
      sender_id: user.id,
      receiver_id: activeMember.clerk_user_id,
      message: messageText,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, tempMessage]);

    // Send to DB
    const { error } = await supabase.from('messages').insert({
      sender_id: user.id,
      receiver_id: activeMember.clerk_user_id,
      message: messageText,
    });

    if (error) {
      console.error('Error sending message:', error);
      setMessages(prev => prev.filter(m => m.id !== tempMessage.id));
    }
  };

  // Search filter
  useEffect(() => {
    const filtered = membersData.filter((member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMembers(filtered);
  }, [searchTerm, membersData]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial fetch
  useEffect(() => {
    if (user?.id) {
      fetchMembers();
    }
  }, [user?.id, fetchMembers]);

  // Setup chat subscription
  useEffect(() => {
    if (!activeMember || !user?.id) return;

    fetchMessages();

    // Cleanup previous subscription
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    // Create new subscription
    channelRef.current = supabase
      .channel(`chat-${[user.id, activeMember.clerk_user_id].sort().join('-')}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const newMessage = payload.new;
          
          const isRelevant =
            (newMessage.sender_id === user.id && newMessage.receiver_id === activeMember.clerk_user_id) ||
            (newMessage.sender_id === activeMember.clerk_user_id && newMessage.receiver_id === user.id);

          if (isRelevant) {
            setMessages((prev) => [...prev, newMessage]);
            
            // Auto-mark as read if received
            if (newMessage.sender_id === activeMember.clerk_user_id && !newMessage.is_read) {
              supabase
                .from('messages')
                .update({ is_read: true })
                .eq('id', newMessage.id);
            }
          }
        }
      )
      .subscribe();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [activeMember, user?.id, fetchMessages]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Team Collaboration
        </h2>
        <button
          onClick={() => setIsInviteOpen(true)}
          className="flex items-center gap-2 bg-[#5f47ff] hover:bg-[#4c36e0] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-210px)] min-h-[550px]">
        {/* Members List */}
        <div className="bg-[#181b2a] border border-slate-800/60 rounded-2xl p-4 flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#121420] text-slate-200 pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 pr-1">
            {filteredMembers.map((member) => {
              const isSelected = activeMember?.id === member.id;
              const unreadCount = messages.filter(
                m => m.sender_id === member.clerk_user_id && !m.is_read
              ).length;

              return (
                <button
                  key={member.id}
                  onClick={() => setActiveMember(member)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all duration-150 ${
                    isSelected
                      ? 'bg-indigo-950/40 border border-indigo-500/20'
                      : 'hover:bg-slate-800/30 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative flex-shrink-0">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span
                        className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-[#181b2a] ${
                          member.status === 'online'
                            ? 'bg-emerald-500'
                            : member.status === 'away'
                            ? 'bg-amber-500'
                            : 'bg-slate-500'
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {member.name}
                      </h4>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <span className="bg-[#5f47ff] text-white text-xs font-medium px-2 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                    <span className="text-[10px] font-medium text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700/40">
                      {member.status}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 bg-[#181b2a] border border-slate-800/60 rounded-2xl flex flex-col overflow-hidden">
          {activeMember ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between gap-3 p-4 border-b border-slate-800/80 bg-slate-900/20">
                <div className="flex items-center gap-3">
                  <img
                    src={activeMember.avatar}
                    alt={activeMember.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {activeMember.name}
                    </h3>
                    <p className="text-xs text-slate-500 capitalize">
                      {activeMember.status}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-950/10 flex flex-col gap-3">
                {messages.map((message) => {
                  const isOwnMessage = message.sender_id === user?.id;

                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                          isOwnMessage
                            ? 'bg-[#5f47ff] text-white rounded-br-md'
                            : 'bg-[#121420] text-slate-200 border border-slate-800 rounded-bl-md'
                        }`}
                      >
                        <p>{message.message}</p>
                        <span className="text-[10px] opacity-60 mt-1 block">
                          {new Date(message.created_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-slate-800/80 bg-[#181b2a]">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={typedMessage}
                    onChange={(e) => setTypedMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        sendMessage();
                      }
                    }}
                    placeholder={`Message ${activeMember.name}`}
                    className="flex-1 bg-[#121420] text-slate-200 px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-indigo-500 text-sm"
                  />
                  <button
                    onClick={sendMessage}
                    className="w-11 h-11 rounded-xl bg-[#5f47ff] hover:bg-[#4c36e0] flex items-center justify-center transition-colors"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 select-none">
              <div className="w-14 h-14 bg-slate-800/40 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-400 mb-4 shadow-inner">
                <MessageSquare className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="text-sm font-semibold text-slate-300">
                No conversation selected
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mt-1.5 leading-relaxed">
                Choose a team member from the list to start chatting.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Invite Modal */}
      <InviteModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onInviteSuccess={() => {
          // Refresh the team member list or update the UI as needed
        }}
      />
    </div>
  );
};

export default TeamView;