import { NextRequest, NextResponse } from 'next/server'
import { getAIReply } from '@/lib/ai'
import { sendFacebookMessage } from '@/lib/facebook'

// GET: Verify webhook with Facebook
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  const verifyToken = process.env.FB_WEBHOOK_VERIFY_TOKEN

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('[Webhook] Facebook webhook verified successfully')
    return new NextResponse(challenge, { status: 200 })
  }

  console.log('[Webhook] Webhook verification failed')
  return NextResponse.json({ error: 'Verification failed' }, { status: 403 })
}

// POST: Handle incoming Facebook messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (body.object !== 'page') {
      return NextResponse.json({ error: 'Not a page event' }, { status: 400 })
    }

    const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN

    if (!pageAccessToken) {
      console.error('[Webhook] FB_PAGE_ACCESS_TOKEN not configured')
      return NextResponse.json({ error: 'Page token not configured' }, { status: 500 })
    }

    // Process each entry
    for (const entry of body.entry || []) {
      for (const messagingEvent of entry.messaging || []) {
        const senderId = messagingEvent.sender?.id
        const message = messagingEvent.message

        // Only handle text messages
        if (!senderId || !message || !message.text || message.is_echo) {
          continue
        }

        console.log(`[Webhook] Message from ${senderId}: ${message.text}`)

        // Get AI reply
        const { reply, error: aiError } = await getAIReply(message.text)

        if (aiError) {
          console.error('[Webhook] AI error:', aiError)
          // Send fallback message
          await sendFacebookMessage(
            senderId,
            'Xin lỗi, hệ thống đang bận. Vui lòng thử lại sau hoặc liên hệ trực tiếp để được hỗ trợ.',
            pageAccessToken
          )
          continue
        }

        // Send reply back to user
        const { success, error: fbError } = await sendFacebookMessage(
          senderId,
          reply,
          pageAccessToken
        )

        if (!success) {
          console.error('[Webhook] Failed to send Facebook message:', fbError)
        } else {
          console.log(`[Webhook] Replied to ${senderId}: ${reply.substring(0, 50)}...`)
        }
      }
    }

    return NextResponse.json({ status: 'ok' }, { status: 200 })
  } catch (error) {
    console.error('[Webhook] Error processing webhook:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
