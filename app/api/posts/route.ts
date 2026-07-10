import { NextRequest, NextResponse } from 'next/server'
import { publishFacebookPost } from '@/lib/facebook'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, imageUrl, pageId, scheduledAt } = body

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN
    const defaultPageId = pageId || process.env.FB_PAGE_ID

    if (!pageAccessToken || !defaultPageId) {
      return NextResponse.json(
        { error: 'Facebook page credentials not configured' },
        { status: 500 }
      )
    }

    // If scheduledAt is in the future, just confirm scheduling (real scheduling requires a job queue)
    const scheduledDate = scheduledAt ? new Date(scheduledAt) : null
    const isScheduled = scheduledDate && scheduledDate > new Date()

    if (isScheduled) {
      // In production, save to database and use a job scheduler
      return NextResponse.json({
        success: true,
        scheduled: true,
        scheduledAt: scheduledDate.toISOString(),
        message: `Post scheduled for ${scheduledDate.toLocaleString('vi-VN')}`,
      })
    }

    const { success, postId, error } = await publishFacebookPost(
      defaultPageId,
      content,
      pageAccessToken,
      imageUrl
    )

    if (!success) {
      return NextResponse.json({ error: error || 'Failed to publish' }, { status: 500 })
    }

    return NextResponse.json({ success: true, postId })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
