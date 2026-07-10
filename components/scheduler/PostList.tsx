'use client'

import { ScheduledPost } from '@/types'
import { cn } from '@/lib/utils'
import { Calendar, Clock, FileText, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react'

interface PostListProps {
  posts: ScheduledPost[]
  selectedDate: Date | null
}

const statusConfig: Record<
  ScheduledPost['status'],
  { label: string; className: string; icon: React.ElementType }
> = {
  draft: { label: 'Nhap', className: 'bg-muted text-muted-foreground', icon: BookOpen },
  scheduled: { label: 'Da len lich', className: 'bg-amber-500/10 text-amber-400', icon: Clock },
  published: { label: 'Da dang', className: 'bg-emerald-500/10 text-emerald-400', icon: CheckCircle2 },
  failed: { label: 'That bai', className: 'bg-red-500/10 text-red-400', icon: AlertCircle },
}

export function PostList({ posts, selectedDate }: PostListProps) {
  const filtered = selectedDate
    ? posts.filter((p) => {
        const d = new Date(p.scheduledAt)
        return (
          d.getFullYear() === selectedDate.getFullYear() &&
          d.getMonth() === selectedDate.getMonth() &&
          d.getDate() === selectedDate.getDate()
        )
      })
    : posts

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-2 text-muted-foreground">
        <FileText className="w-8 h-8 opacity-30" />
        <p className="text-sm">
          {selectedDate ? 'Khong co bai viet nao trong ngay nay' : 'Chua co bai viet nao'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {filtered.map((post) => {
        const config = statusConfig[post.status]
        const StatusIcon = config.icon

        return (
          <div
            key={post.id}
            className="bg-muted rounded-xl p-4 border border-border hover:border-primary/30 transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <p className="text-sm text-foreground line-clamp-2 leading-relaxed flex-1">
                {post.content}
              </p>
              <span
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold shrink-0',
                  config.className
                )}
              >
                <StatusIcon className="w-3 h-3" />
                {config.label}
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.scheduledAt).toLocaleDateString('vi-VN')}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(post.scheduledAt).toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              {post.pageName && <span>{post.pageName}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
