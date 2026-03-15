"use client"

import type { Task, FilterType } from "@/app/page"
import { TodoItem } from "@/components/todo-item"
import { Card, CardContent } from "@/components/ui/card"
import { ClipboardList, CheckCircle2, Clock } from "lucide-react"

interface TodoListProps {
  tasks: Task[]
  filter: FilterType
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
  onEdit: (task: Task) => void
}

export function TodoList({
  tasks,
  filter,
  onDelete,
  onToggleComplete,
  onEdit,
}: TodoListProps) {
  if (tasks.length === 0) {
    const emptyMessages = {
      all: { icon: ClipboardList, title: "No tasks yet", subtitle: "Add a task above to get started" },
      pending: { icon: Clock, title: "No pending tasks", subtitle: "All caught up! Add new tasks above" },
      completed: { icon: CheckCircle2, title: "No completed tasks", subtitle: "Complete some tasks to see them here" },
    }
    const { icon: Icon, title, subtitle } = emptyMessages[filter]

    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Icon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </CardContent>
      </Card>
    )
  }

  // When showing "all", group by status. Otherwise show flat list.
  if (filter === "all") {
    const pendingTasks = tasks.filter((task) => !task.completed)
    const completedTasks = tasks.filter((task) => task.completed)

    return (
      <div className="space-y-4">
        {pendingTasks.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              Pending ({pendingTasks.length})
            </h2>
            <div className="space-y-2">
              {pendingTasks.map((task) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  onDelete={onDelete}
                  onToggleComplete={onToggleComplete}
                  onEdit={onEdit}
                />
              ))}
            </div>
          </div>
        )}

        {completedTasks.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              Completed ({completedTasks.length})
            </h2>
            <div className="space-y-2">
              {completedTasks.map((task) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  onDelete={onDelete}
                  onToggleComplete={onToggleComplete}
                  onEdit={onEdit}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Filtered view (pending or completed only)
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
