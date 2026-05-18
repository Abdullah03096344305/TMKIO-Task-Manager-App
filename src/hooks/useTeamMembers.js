import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export const useTeamMembers = (currentUserId) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  const fetchMembers = useCallback(async () => {
    if (!currentUserId) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .neq('clerk_user_id', currentUserId)
      .order('full_name');

    if (!error && data) {
      const formatted = data.map(member => ({
        id: member.id,
        clerk_user_id: member.clerk_user_id,
        name: member.full_name || 'Anonymous',
        role: member.role || 'Member',
        status: onlineUsers.has(member.clerk_user_id) ? 'online' : member.status,
        avatar: member.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.full_name || 'User')}&background=5f47ff&color=fff`,
        last_seen: member.last_seen,
      }));
      setMembers(formatted);
    }
    setLoading(false);
  }, [currentUserId, onlineUsers]);

  // Setup presence tracking
  useEffect(() => {
    if (!currentUserId) return;

    const presenceChannel = supabase.channel('online-users', {
      config: {
        presence: {
          key: currentUserId,
        },
      },
    });

    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState();
        const online = new Set(Object.keys(state));
        setOnlineUsers(online);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await presenceChannel.track({
            user_id: currentUserId,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      presenceChannel.unsubscribe();
    };
  }, [currentUserId]);

  return { members, loading, onlineUsers, fetchMembers };
};