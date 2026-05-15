import { supabase } from './supabase'

// CREATE TASK
export async function createTask(task) {
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select()

  if (error) throw error
  return data
}

// GET TASKS FOR USER
export async function getTasks(userId) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error
  return data
}