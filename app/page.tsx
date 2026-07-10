import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { StatsCard } from '@/components/dashboard/StatsCard'
import {
  MessageCircle,
  Bot,
  CalendarDays,
  CheckCircle2,
  Zap,
  Activity,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'

const recentActivity = [
  { id: 1, type: 'message', text: 'Nguyen Van A hoi ve san pham', time: '2 phut truoc' },
  { id: 2, type: 'ai', text: 'AI tu dong tra loi Tran Thi B', time: '5 phut truoc' },
  { id: 3, type: 'post', text: 'Bai viet "Khuyen mai thang 7" da dang', time: '1 gio truoc' },
  { id: 4, type: 'schedule', text: 'Len lich bai viet cho 10:00 ngay mai', time: '2 gio truoc' },
  { id: 5, type: 'message', text: 'Le Van C hoi gio mo cua', time: '3 gio truoc' },
]

const activityIconName: Record<string, string> = {
  message: 'MessageCircle',
  ai: 'Bot',
  post: 'CheckCircle2',
  schedule: 'CalendarDays',
}

const activityColor: Record<string, string> = {
  message: 'text-primary bg-primary/10',
  ai: 'text-emerald-400 bg-emerald-400/10',
  post: 'text-amber-400 bg-amber-400/10',
  schedule: 'text-blue-400 bg-blue-400/10',
}

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard" subtitle="Tong quan he thong SocialAI">
      <div className="p-6 space-y-6">
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Tin nhan hom nay"
            value="142"
            change="18%"
            positive={true}
            icon={MessageCircle}
            accent="blue"
          />
          <StatsCard
            title="Tu dong tra loi"
            value="128"
            change="22%"
            positive={true}
            icon={Bot}
            accent="green"
          />
          <StatsCard
            title="Bai da len lich"
            value="7"
            change="2"
            positive={true}
            icon={CalendarDays}
            accent="amber"
          />
          <StatsCard
            title="Da dang hom nay"
            value="3"
            change="1"
            positive={false}
            icon={CheckCircle2}
            accent="red"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Hoat dong gan day</h2>
              </div>
              <span className="text-[10px] text-muted-foreground">5 hoat dong moi nhat</span>
            </div>
            <div className="space-y-3">
              {recentActivity.map((item) => {
                const colorClass = activityColor[item.type] || 'text-muted-foreground bg-muted'
                const icons: Record<string, React.ReactNode> = {
                  message: <MessageCircle className="w-3.5 h-3.5" />,
                  ai: <Bot className="w-3.5 h-3.5" />,
                  post: <CheckCircle2 className="w-3.5 h-3.5" />,
                  schedule: <CalendarDays className="w-3.5 h-3.5" />,
                }
                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      {icons[item.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{item.text}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">{item.time}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Truy cap nhanh</h2>
            </div>
            <div className="space-y-2">
              <Link
                href="/chatbot"
                className="flex items-center justify-between px-4 py-3 rounded-lg bg-muted hover:bg-muted/70 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Bot className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Chatbot AI</p>
                    <p className="text-[10px] text-muted-foreground">128 tin da tra loi</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link
                href="/scheduler"
                className="flex items-center justify-between px-4 py-3 rounded-lg bg-muted hover:bg-muted/70 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <CalendarDays className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Lich dang bai</p>
                    <p className="text-[10px] text-muted-foreground">7 bai sap dang</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-amber-400 transition-colors" />
              </Link>
              <Link
                href="/settings"
                className="flex items-center justify-between px-4 py-3 rounded-lg bg-muted hover:bg-muted/70 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Webhook Status</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                      Dang hoat dong
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-400 transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        {/* Webhook info banner */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-foreground mb-1">
                Webhook Facebook da san sang
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Endpoint:{' '}
                <code className="px-1.5 py-0.5 rounded bg-muted text-primary text-[11px]">
                  POST /api/webhook/facebook
                </code>{' '}
                — Tat ca tin nhan tu Messenger se duoc AI tu dong tra loi. Vui long cau hinh{' '}
                <code className="px-1.5 py-0.5 rounded bg-muted text-primary text-[11px]">
                  FB_PAGE_ACCESS_TOKEN
                </code>{' '}
                va{' '}
                <code className="px-1.5 py-0.5 rounded bg-muted text-primary text-[11px]">
                  OPENAI_API_KEY
                </code>{' '}
                trong file .env de kich hoat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
