"use client"

import type { Task } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Trash2, Calendar } from "lucide-react"

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function isOverdue(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

interface TodoItemProps {
  task: Task
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
  onEdit: (task: Task) => void
}

export function TodoItem({
  task,
  onDelete,
  onToggleComplete,
  onEdit,
}: TodoItemProps) {
  return (
    <Card className={task.completed ? "opacity-60" : ""}>
      <CardContent className="py-4 flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          className="mt-1"
        />

        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium text-foreground ${
              task.completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`text-sm mt-1 ${
                task.completed
                  ? "line-through text-muted-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {task.description}
            </p>
          )}
          {task.dueDate && (
            <p
              className={`text-xs mt-2 flex items-center gap-1 ${
                task.completed
                  ? "text-muted-foreground"
                  : isOverdue(task.dueDate)
                    ? "text-destructive"
                    : "text-muted-foreground"
              }`}
            >
              <Calendar className="w-3 h-3" />
              {isOverdue(task.dueDate) && !task.completed ? "Overdue: " : "Due: "}
              {formatDate(task.dueDate)}
            </p>
          )}
        </div>

        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(task)}
            className="h-8 w-8"
          >
            <Pencil className="w-4 h-4" />
            <span className="sr-only">Edit task</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
            <span className="sr-only">Delete task</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
