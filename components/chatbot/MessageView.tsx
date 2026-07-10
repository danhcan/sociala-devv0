'use client'

import { Conversation, Message } from '@/types'
import { cn } from '@/lib/utils'
import { Bot, User } from 'lucide-react'

interface MessageViewProps {
  conversation: Conversation | null
}

function MessageBubble({ message }: { message: Message }) {
  const isBot = message.isFromPage

  return (
    <div
      className={cn(
        'flex items-end gap-2 max-w-[80%]',
        isBot ? 'self-start' : 'self-end flex-row-reverse'
      )}
    >
      <div
        className={cn(
          'w-7 h-7 rounded-full flex items-center justify-center shrink-0',
          isBot ? 'bg-primary/20' : 'bg-muted'
        )}
      >
        {isBot ? (
          <Bot className="w-3.5 h-3.5 text-primary" />
        ) : (
          <User className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </div>
      <div>
        <div
          className={cn(
            'px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed',
            isBot
              ? 'bg-card border border-border text-foreground rounded-bl-sm'
              : 'bg-primary text-primary-foreground rounded-br-sm'
          )}
        >
          {message.text}
        </div>
        <p
          className={cn(
            'text-[10px] text-muted-foreground mt-1',
            isBot ? 'text-left' : 'text-right'
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
          })}
          {isBot && ' · AI'}
        </p>
      </div>
    </div>
  )
}

export function MessageView({ conversation }: MessageViewProps) {
  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground">
        <Bot className="w-12 h-12 opacity-20" />
        <p className="text-sm">Chon mot cuoc hoi thoai de xem tin nhan</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Conversation header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-card">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="text-xs font-semibold text-primary">
            {conversation.participantName.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{conversation.participantName}</p>
          <p className="text-[11px] text-muted-foreground">Via Facebook Messenger</p>
        </div>
        <div className="ml-auto">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Tu dong tra loi
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        {conversation.messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>
    </div>
  )
}
