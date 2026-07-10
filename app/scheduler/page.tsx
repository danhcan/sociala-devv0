'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { PostCalendar } from '@/components/scheduler/PostCalendar'
import { PostForm } from '@/components/scheduler/PostForm'
import { PostList } from '@/components/scheduler/PostList'
import { ScheduledPost } from '@/types'
import { PlusCircle, List, CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils'

const mockPosts: ScheduledPost[] = [
  {
    id: '1',
    content: 'Khuyen mai lon thang 7! Giam 30% tat ca san pham. Lien he ngay de duoc tu van mien phi!',
    scheduledAt: new Date(new Date().setHours(10, 0, 0, 0)),
    status: 'published',
    pageName: 'Fanpage cua ban',
  },
  {
    id: '2',
    content: 'San pham moi vua ra mat! Cong nghe hien dai, thiet ke tinh te. Xem ngay tai website cua chung toi.',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() + 1)),
    status: 'scheduled',
    pageName: 'Fanpage cua ban',
  },
  {
    id: '3',
    content: 'Chao mung ban den voi Fanpage chinh thuc cua chung toi. Hay like va theo doi de cap nhat tin tuc moi nhat!',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    status: 'published',
    pageName: 'Fanpage cua ban',
  },
  {
    id: '4',
    content: 'Bai viet ve xu huong thi truong thang 7/2026 - nhung dieu ban can biet.',
    scheduledAt: new Date(new Date().setDate(new Date().getDate() + 3)),
    status: 'draft',
    pageName: 'Fanpage cua ban',
  },
]

type Tab = 'calendar' | 'list'

export default function SchedulerPage() {
  const [posts, setPosts] = useState<ScheduledPost[]>(mockPosts)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [tab, setTab] = useState<Tab>('calendar')
  const [showForm, setShowForm] = useState(false)

  function handlePostCreated(post: ScheduledPost) {
    setPosts((prev) => [post, ...prev])
    setShowForm(false)
  }

  const scheduledCount = posts.filter((p) => p.status === 'scheduled').length
  const publishedCount = posts.filter((p) => p.status === 'published').length

  return (
    <DashboardLayout
      title="Lich dang bai"
      subtitle="Soan thao va len lich dang bai len Fanpage"
    >
      <div className="p-6 space-y-5">
        {/* Summary bar */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-xs font-medium text-amber-400">{scheduledCount} bai da len lich</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-medium text-emerald-400">{publishedCount} bai da dang</span>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => setShowForm((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              {showForm ? 'An form' : 'Tao bai moi'}
            </button>
          </div>
        </div>

        {/* Post form */}
        {showForm && (
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-primary" />
              Tao bai viet moi
              {selectedDate && (
                <span className="text-xs font-normal text-muted-foreground ml-1">
                  — {selectedDate.toLocaleDateString('vi-VN')}
                </span>
              )}
            </h3>
            <PostForm onPostCreated={handlePostCreated} selectedDate={selectedDate ?? undefined} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Calendar */}
          <div className="lg:col-span-3">
            {/* Tab switcher */}
            <div className="flex items-center gap-1 p-1 bg-muted rounded-xl mb-4 w-fit">
              <button
                onClick={() => setTab('calendar')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  tab === 'calendar'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <CalendarDays className="w-3.5 h-3.5" />
                Lich
              </button>
              <button
                onClick={() => setTab('list')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                  tab === 'list'
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <List className="w-3.5 h-3.5" />
                Danh sach
              </button>
            </div>

            {tab === 'calendar' ? (
              <PostCalendar
                posts={posts}
                onDateSelect={(date) => {
                  setSelectedDate(date)
                  setShowForm(true)
                }}
                selectedDate={selectedDate}
              />
            ) : (
              <div className="bg-card rounded-xl border border-border p-5">
                <PostList posts={posts} selectedDate={null} />
              </div>
            )}
          </div>

          {/* Selected date posts */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border p-5 sticky top-6">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <List className="w-4 h-4 text-primary" />
                {selectedDate
                  ? `Bai viet ngay ${selectedDate.toLocaleDateString('vi-VN')}`
                  : 'Tat ca bai viet'}
              </h3>
              <PostList posts={posts} selectedDate={selectedDate} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
