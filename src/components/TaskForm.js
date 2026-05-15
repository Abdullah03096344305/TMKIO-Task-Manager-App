'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/lib/supabase'

export default function TaskForm({ onTaskAdded }) {
  const { user, isSignedIn } = useUser()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (!isSignedIn || !user) {
      alert('You must be signed in')
      return
    }

    if (!title.trim()) return

    setLoading(true)

    const { data, error } = await supabase
      .from('tasks')
      .insert([
        {
          title,
          description,
          user_id: user.id,
        },
      ])
      .select()

    setLoading(false)

    if (error) {
      console.error(error)
      alert('Failed to create task')
      return
    }

    setTitle('')

    if (onTaskAdded) {
      onTaskAdded(data?.[0])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4">
      <input
        className="border p-2 rounded w-full"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full"
        placeholder="Enter description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? 'Adding...' : 'Add'}
      </button>
    </form>
  )
}