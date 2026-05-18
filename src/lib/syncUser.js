import { supabase } from './supabase';

export const syncUserWithSupabase = async (clerkUser) => {
  if (!clerkUser?.id) return null;

  try {
    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('clerk_user_id', clerkUser.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching user:', fetchError);
      return null;
    }

    if (!existingUser) {
      // Create new user profile
      const { data: newUser, error: insertError } = await supabase
        .from('profiles')
        .insert({
          clerk_user_id: clerkUser.id,
          full_name: clerkUser.fullName || clerkUser.username || 'User',
          avatar_url: clerkUser.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(clerkUser.fullName || 'User')}&background=5f47ff&color=fff`,
          role: 'Member',
          status: 'online',
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating user profile:', insertError);
        return null;
      }

      return newUser;
    } else {
      // Update existing user
      const { data: updatedUser, error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: clerkUser.fullName || clerkUser.username,
          avatar_url: clerkUser.imageUrl,
          last_seen: new Date().toISOString(),
        })
        .eq('clerk_user_id', clerkUser.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating user profile:', updateError);
      }

      return updatedUser || existingUser;
    }
  } catch (error) {
    console.error('Error in syncUserWithSupabase:', error);
    return null;
  }
};

export const updateUserStatus = async (clerkUserId, status) => {
  if (!clerkUserId) return;

  try {
    await supabase
      .from('profiles')
      .update({ 
        status, 
        last_seen: new Date().toISOString() 
      })
      .eq('clerk_user_id', clerkUserId);
  } catch (error) {
    console.error('Error updating user status:', error);
  }
};