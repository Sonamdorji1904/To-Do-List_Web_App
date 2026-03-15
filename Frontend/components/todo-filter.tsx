"use client"

import type { FilterType } from "@/app/page"
import { Button } from "@/components/ui/button"

interface TodoFilterProps {
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
  counts: {
    all: number
    pending: number
    completed: number
  }
}

export function TodoFilter({ filter, onFilterChange, counts }: TodoFilterProps) {
  const filters: { value: FilterType; label: string; count: number }[] = [
    { value: "all", label: "All", count: counts.all },
    { value: "pending", label: "Pending", count: counts.pending },
    { value: "completed", label: "Completed", count: counts.completed },
  ]

  return (
    <div className="flex items-center gap-2 mb-4">
      {filters.map((f) => (
        <Button
          key={f.value}
          variant={filter === f.value ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(f.value)}
          className="gap-1.5"
        >
          {f.label}
          <span
            className={
              filter === f.value
                ? "bg-primary-foreground/20 text-primary-foreground px-1.5 py-0.5 rounded text-xs"
                : "bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-xs"
            }
          >
            {f.count}
          </span>
        </Button>
      ))}
    </div>
  )
}
