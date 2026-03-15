"use client"

import { useState } from "react"
import { TodoList } from "@/components/todo-list"
import { TodoForm } from "@/components/todo-form"
import { EditModal } from "@/components/edit-modal"
import { TodoFilter } from "@/components/todo-filter"

export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
  dueDate: Date | null
}

export type FilterType = "all" | "pending" | "completed"

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [filter, setFilter] = useState<FilterType>("all")

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "pending") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  const addTask = (title: string, description: string, dueDate: Date | null) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
      dueDate,
    }
    setTasks([newTask, ...tasks])
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const updateTask = (id: string, title: string, description: string, dueDate: Date | null) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title, description, dueDate } : task
      )
    )
    setEditingTask(null)
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Todo List
          </h1>
          <p className="text-muted-foreground">
            Manage your tasks efficiently
          </p>
        </header>

        <TodoForm onAddTask={addTask} />

        <TodoFilter
          filter={filter}
          onFilterChange={setFilter}
          counts={{
            all: tasks.length,
            pending: tasks.filter((t) => !t.completed).length,
            completed: tasks.filter((t) => t.completed).length,
          }}
        />

        <TodoList
          tasks={filteredTasks}
          filter={filter}
          onDelete={deleteTask}
          onToggleComplete={toggleComplete}
          onEdit={setEditingTask}
        />

        {editingTask && (
          <EditModal
            task={editingTask}
            onSave={updateTask}
            onClose={() => setEditingTask(null)}
          />
        )}
      </div>
    </main>
  )
}
