'use client'

import { useState } from 'react'
import { Send, Calendar, Image, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { ScheduledPost } from '@/types'

interface PostFormProps {
  onPostCreated: (post: ScheduledPost) => void
  selectedDate?: Date
}

export function PostForm({ onPostCreated, selectedDate }: PostFormProps) {
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [scheduledAt, setScheduledAt] = useState(
    selectedDate
      ? new Date(selectedDate.getTime() + 9 * 3600000).toISOString().slice(0, 16)
      : ''
  )
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const charCount = content.length
  const maxChars = 2000

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          imageUrl: imageUrl || undefined,
          scheduledAt: scheduledAt || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setResult({ type: 'error', message: data.error || 'Co loi xay ra' })
        return
      }

      const newPost: ScheduledPost = {
        id: Date.now().toString(),
        content,
        imageUrl: imageUrl || undefined,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : new Date(),
        status: scheduledAt ? 'scheduled' : 'published',
        pageName: 'Fanpage cua ban',
      }

      onPostCreated(newPost)
      setResult({
        type: 'success',
        message: data.scheduled
          ? `Da len lich: ${data.scheduledAt ? new Date(data.scheduledAt).toLocaleString('vi-VN') : ''}`
          : 'Dang bai thanh cong!',
      })
      setContent('')
      setImageUrl('')
    } catch {
      setResult({ type: 'error', message: 'Loi ket noi. Vui long thu lai.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-2">
          Noi dung bai viet
        </label>
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, maxChars))}
            placeholder="Viet noi dung bai dang len Fanpage cua ban..."
            rows={5}
            className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all leading-relaxed"
          />
          <span
            className={`absolute bottom-3 right-3 text-[10px] ${charCount > maxChars * 0.9 ? 'text-amber-400' : 'text-muted-foreground'}`}
          >
            {charCount}/{maxChars}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
            <Image className="w-3 h-3" />
            URL anh (tuy chon)
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            Hen gio dang (tuy chon)
          </label>
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            className="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
        </div>
      </div>

      {result && (
        <div
          className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm ${
            result.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}
        >
          {result.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          {result.message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !content.trim()}
        className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 shadow-sm"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Dang xu ly...
          </>
        ) : scheduledAt ? (
          <>
            <Calendar className="w-4 h-4" />
            Len lich dang bai
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Dang ngay
          </>
        )}
      </button>
    </form>
  )
}
