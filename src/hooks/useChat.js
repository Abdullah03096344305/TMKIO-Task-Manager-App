import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';

export const useChat = (currentUserId, receiverId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const channelRef = useRef(null);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    if (!currentUserId || !receiverId) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(
        `and(sender_id.eq.${currentUserId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${currentUserId})`
      )
      .order('created_at', { ascending: true });

    if (!error && data) {
      setMessages(data);
      
      // Mark unread messages as read
      const unreadMessages = data.filter(
        msg => msg.receiver_id === currentUserId && !msg.is_read
      );
      
      if (unreadMessages.length > 0) {
        await supabase
          .from('messages')
          .update({ is_read: true })
          .in('id', unreadMessages.map(m => m.id));
      }
    }
    setLoading(false);
  }, [currentUserId, receiverId]);

  // Send message
  const sendMessage = useCallback(async (messageText) => {
    if (!messageText.trim() || !currentUserId || !receiverId) return null;

    const tempMessage = {
      id: `temp-${Date.now()}`,
      sender_id: currentUserId,
      receiver_id: receiverId,
      message: messageText.trim(),
      is_read: false,
      created_at: new Date().toISOString(),
    };

    // Optimistic update
    setMessages(prev => [...prev, tempMessage]);

    // Send to database
    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: currentUserId,
        receiver_id: receiverId,
        message: messageText.trim(),
      })
      .select()
      .single();

    if (error) {
      // Remove optimistic message on error
      setMessages(prev => prev.filter(m => m.id !== tempMessage.id));
      console.error('Error sending message:', error);
      return null;
    }

    // Replace temp message with real one
    setMessages(prev => prev.map(m => m.id === tempMessage.id ? data : m));
    return data;
  }, [currentUserId, receiverId]);

  // Send typing indicator
  const sendTyping = useCallback(async (isTyping) => {
    if (!currentUserId || !receiverId) return;

    const channel = supabase.channel(`typing-${receiverId}`);
    await channel.send({
      type: 'broadcast',
      event: 'typing',
      payload: { user_id: currentUserId, is_typing: isTyping },
    });
  }, [currentUserId, receiverId]);

  // Setup real-time subscriptions
  useEffect(() => {
    if (!currentUserId || !receiverId) return;

    // Messages subscription
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    channelRef.current = supabase
      .channel(`chat-${[currentUserId, receiverId].sort().join('-')}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `sender_id=eq.${receiverId},receiver_id=eq.${currentUserId}`,
        },
        async (payload) => {
          const newMessage = payload.new;
          setMessages(prev => [...prev, newMessage]);
          
          // Mark as read
          if (!newMessage.is_read) {
            await supabase
              .from('messages')
              .update({ is_read: true })
              .eq('id', newMessage.id);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `sender_id=eq.${currentUserId},receiver_id=eq.${receiverId}`,
        },
        (payload) => {
          const newMessage = payload.new;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    // Typing subscription
    const typingChannel = supabase.channel(`typing-${currentUserId}`);
    typingChannel
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        if (payload.user_id === receiverId) {
          setTyping(payload.is_typing);
          setTimeout(() => setTyping(false), 1500);
        }
      })
      .subscribe();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
      typingChannel.unsubscribe();
    };
  }, [currentUserId, receiverId]);

  return {
    messages,
    loading,
    typing,
    sendMessage,
    sendTyping,
    fetchMessages,
  };
};