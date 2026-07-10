const FB_GRAPH_URL = 'https://graph.facebook.com/v19.0'

export async function sendFacebookMessage(
  recipientId: string,
  message: string,
  pageAccessToken: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const response = await fetch(`${FB_GRAPH_URL}/me/messages?access_token=${pageAccessToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text: message },
        messaging_type: 'RESPONSE',
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false, error: data.error?.message || 'Facebook API error' }
    }

    return { success: true, messageId: data.message_id }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function publishFacebookPost(
  pageId: string,
  message: string,
  pageAccessToken: string,
  imageUrl?: string
): Promise<{ success: boolean; postId?: string; error?: string }> {
  try {
    const endpoint = imageUrl
      ? `${FB_GRAPH_URL}/${pageId}/photos`
      : `${FB_GRAPH_URL}/${pageId}/feed`

    const body: Record<string, string> = {
      message,
      access_token: pageAccessToken,
    }

    if (imageUrl) {
      body.url = imageUrl
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false, error: data.error?.message || 'Failed to publish post' }
    }

    return { success: true, postId: data.id }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

export async function getFacebookPages(
  userAccessToken: string
): Promise<{ id: string; name: string; access_token: string }[]> {
  try {
    const response = await fetch(
      `${FB_GRAPH_URL}/me/accounts?access_token=${userAccessToken}`
    )
    const data = await response.json()
    return data.data || []
  } catch {
    return []
  }
}
