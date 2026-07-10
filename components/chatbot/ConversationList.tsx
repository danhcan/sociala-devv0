'use client'

import { Conversation } from '@/types'
import { cn } from '@/lib/utils'
import { MessageCircle } from 'lucide-react'

interface ConversationListProps {
  conversations: Conversation[]
  selectedId: string | null
  onSelect: (id: string) => void
}

function timeAgo(dateString: string): string {
  const diff = (Date.now() - new Date(dateString).getTime()) / 1000
  if (diff < 60) return 'Vua xong'
  if (diff < 3600) return `${Math.floor(diff / 60)} phut`
  if (diff < 86400) return `${Math.floor(diff / 3600)} gio`
  return `${Math.floor(diff / 86400)} ngay`
}

function AvatarPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  return (
    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
      <span className="text-xs font-semibold text-primary">{initials}</span>
    </div>
  )
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
}: ConversationListProps) {
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground p-8">
        <MessageCircle className="w-10 h-10 opacity-30" />
        <p className="text-sm text-center">Chua co tin nhan nao. Webhook dang cho ket noi...</p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-border">
      {conversations.map((conv) => (
        <li key={conv.id}>
          <button
            onClick={() => onSelect(conv.id)}
            className={cn(
              'w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted',
              selectedId === conv.id && 'bg-muted border-l-2 border-l-primary'
            )}
          >
            <div className="relative mt-0.5">
              <AvatarPlaceholder name={conv.participantName} />
              {conv.unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[9px] font-bold text-primary-foreground flex items-center justify-center">
                  {conv.unreadCount > 9 ? '9+' : conv.unreadCount}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p
                  className={cn(
                    'text-sm truncate',
                    conv.unreadCount > 0 ? 'font-semibold text-foreground' : 'font-medium text-foreground/80'
                  )}
                >
                  {conv.participantName}
                </p>
                <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
                  {timeAgo(conv.lastMessageTime)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}
