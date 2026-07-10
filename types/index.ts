export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  text: string
  timestamp: string
  isFromPage: boolean
  status?: 'sent' | 'delivered' | 'read'
}

export interface Conversation {
  id: string
  participantName: string
  participantAvatar?: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  messages: Message[]
}

export interface ScheduledPost {
  id: string
  content: string
  imageUrl?: string
  scheduledAt: Date
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  pageId?: string
  pageName?: string
}

export interface FacebookPage {
  id: string
  name: string
  accessToken: string
  category?: string
  fanCount?: number
}

export interface DashboardStats {
  totalMessages: number
  autoReplied: number
  scheduledPosts: number
  publishedToday: number
}
