'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { getTasks } from '@/lib/actions'

export default function TasksPage() {
  const { user } = useUser()

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (user) {
      fetchTasks()
    }
  }, [user])

  async function fetchTasks() {
    const data = await getTasks(user.id)
    setTasks(data)
  }

  return (
    <div>
      <h1>My Tasks</h1>

      {tasks.map((task) => (
        <div key={task.id}>
          {task.title}
          {task.description && <p>{task.description}</p>}
        </div>
      ))}
    </div>
  )
}