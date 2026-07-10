'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { ConversationList } from '@/components/chatbot/ConversationList'
import { MessageView } from '@/components/chatbot/MessageView'
import { Conversation } from '@/types'
import { Bot, Search, RefreshCw } from 'lucide-react'

// Mock data — in production this would come from a database
const mockConversations: Conversation[] = [
  {
    id: '1',
    participantName: 'Nguyen Van An',
    lastMessage: 'San pham co giao hang khong?',
    lastMessageTime: new Date(Date.now() - 2 * 60000).toISOString(),
    unreadCount: 2,
    messages: [
      {
        id: 'm1',
        senderId: 'user1',
        senderName: 'Nguyen Van An',
        text: 'Chao shop, san pham co con hang khong a?',
        timestamp: new Date(Date.now() - 10 * 60000).toISOString(),
        isFromPage: false,
      },
      {
        id: 'm2',
        senderId: 'page',
        senderName: 'AI Bot',
        text: 'Chao ban! Cam on ban da lien he. Hien tai san pham van con hang. Ban muon biet them thong tin gi khong?',
        timestamp: new Date(Date.now() - 9 * 60000).toISOString(),
        isFromPage: true,
      },
      {
        id: 'm3',
        senderId: 'user1',
        senderName: 'Nguyen Van An',
        text: 'San pham co giao hang khong?',
        timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
        isFromPage: false,
      },
    ],
  },
  {
    id: '2',
    participantName: 'Tran Thi Bich',
    lastMessage: 'AI: Da, chung toi ho tro doi tra trong 7 ngay.',
    lastMessageTime: new Date(Date.now() - 15 * 60000).toISOString(),
    unreadCount: 0,
    messages: [
      {
        id: 'm4',
        senderId: 'user2',
        senderName: 'Tran Thi Bich',
        text: 'Chinh sach doi tra hang nhu the nao?',
        timestamp: new Date(Date.now() - 20 * 60000).toISOString(),
        isFromPage: false,
      },
      {
        id: 'm5',
        senderId: 'page',
        senderName: 'AI Bot',
        text: 'Da, chung toi ho tro doi tra trong 7 ngay ke tu ngay mua hang. San pham phai con nguyen seal va day du phu kien. Ban co the lien he hotline 1900xxxx de duoc ho tro.',
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        isFromPage: true,
      },
    ],
  },
  {
    id: '3',
    participantName: 'Le Minh Duc',
    lastMessage: 'Cam on shop nha!',
    lastMessageTime: new Date(Date.now() - 60 * 60000).toISOString(),
    unreadCount: 0,
    messages: [
      {
        id: 'm6',
        senderId: 'user3',
        senderName: 'Le Minh Duc',
        text: 'Gio mo cua cua shop la may gio vay?',
        timestamp: new Date(Date.now() - 65 * 60000).toISOString(),
        isFromPage: false,
      },
      {
        id: 'm7',
        senderId: 'page',
        senderName: 'AI Bot',
        text: 'Shop chung toi mo cua tu 8:00 sang den 10:00 toi tat ca cac ngay trong tuan, ke ca chu nhat. Ban co the den truc tiep hoac dat hang online 24/7.',
        timestamp: new Date(Date.now() - 63 * 60000).toISOString(),
        isFromPage: true,
      },
      {
        id: 'm8',
        senderId: 'user3',
        senderName: 'Le Minh Duc',
        text: 'Cam on shop nha!',
        timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
        isFromPage: false,
      },
    ],
  },
]

export default function ChatbotPage() {
  const [conversations] = useState<Conversation[]>(mockConversations)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const selected = conversations.find((c) => c.id === selectedId) ?? null

  const filtered = conversations.filter((c) =>
    c.participantName.toLowerCase().includes(search.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(search.toLowerCase())
  )

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0)

  return (
    <DashboardLayout
      title="Chatbot AI (CSKH)"
      subtitle="Tu dong tra loi tin nhan tu Facebook Messenger"
    >
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Left: conversation list */}
        <div className="w-80 border-r border-border flex flex-col shrink-0 bg-card">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Cuoc hoi thoai</span>
                {totalUnread > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                    {totalUnread}
                  </span>
                )}
              </div>
              <button
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                aria-label="Refresh"
                title="Lam moi"
              >
                <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tim kiem..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-muted border border-border rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* AI status badge */}
          <div className="mx-4 my-3 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
            <span className="text-[11px] text-emerald-400 font-medium">AI dang hoat dong — Tu dong tra loi</span>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            <ConversationList
              conversations={filtered}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>

        {/* Right: message view */}
        <div className="flex-1 bg-background overflow-hidden">
          <MessageView conversation={selected} />
        </div>
      </div>
    </DashboardLayout>
  )
}
