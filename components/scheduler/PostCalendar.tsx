'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ScheduledPost } from '@/types'
import { cn } from '@/lib/utils'

interface PostCalendarProps {
  posts: ScheduledPost[]
  onDateSelect: (date: Date) => void
  selectedDate: Date | null
}

const DAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
const MONTHS = [
  'Thang 1', 'Thang 2', 'Thang 3', 'Thang 4', 'Thang 5', 'Thang 6',
  'Thang 7', 'Thang 8', 'Thang 9', 'Thang 10', 'Thang 11', 'Thang 12',
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

const statusColors: Record<ScheduledPost['status'], string> = {
  draft: 'bg-muted-foreground',
  scheduled: 'bg-amber-400',
  published: 'bg-emerald-400',
  failed: 'bg-red-400',
}

export function PostCalendar({ posts, onDateSelect, selectedDate }: PostCalendarProps) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  function getPostsForDay(day: number) {
    return posts.filter((p) => {
      const d = new Date(p.scheduledAt)
      return d.getFullYear() === viewYear && d.getMonth() === viewMonth && d.getDate() === day
    })
  }

  const blanks = Array.from({ length: firstDay })
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Calendar header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <button
          onClick={prevMonth}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          aria-label="Thang truoc"
        >
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </button>
        <h3 className="text-sm font-semibold text-foreground">
          {MONTHS[viewMonth]} {viewYear}
        </h3>
        <button
          onClick={nextMonth}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          aria-label="Thang sau"
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 border-b border-border">
        {DAYS.map((d) => (
          <div key={d} className="py-2 text-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="h-14 border-b border-r border-border/50" />
        ))}
        {days.map((day) => {
          const dayPosts = getPostsForDay(day)
          const isToday =
            today.getFullYear() === viewYear &&
            today.getMonth() === viewMonth &&
            today.getDate() === day
          const isSelected =
            selectedDate &&
            selectedDate.getFullYear() === viewYear &&
            selectedDate.getMonth() === viewMonth &&
            selectedDate.getDate() === day

          return (
            <button
              key={day}
              onClick={() => onDateSelect(new Date(viewYear, viewMonth, day))}
              className={cn(
                'h-14 border-b border-r border-border/50 flex flex-col items-center pt-1.5 gap-1 transition-colors hover:bg-muted/50 relative',
                isSelected && 'bg-primary/10'
              )}
            >
              <span
                className={cn(
                  'text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full',
                  isToday
                    ? 'bg-primary text-primary-foreground font-bold'
                    : isSelected
                    ? 'text-primary font-semibold'
                    : 'text-foreground/80'
                )}
              >
                {day}
              </span>
              {dayPosts.length > 0 && (
                <div className="flex gap-0.5">
                  {dayPosts.slice(0, 3).map((p) => (
                    <span
                      key={p.id}
                      className={cn('w-1.5 h-1.5 rounded-full', statusColors[p.status])}
                      title={p.status}
                    />
                  ))}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-5 py-3 border-t border-border">
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1.5">
            <span className={cn('w-2 h-2 rounded-full', color)} />
            <span className="text-[10px] text-muted-foreground capitalize">{status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
