export async function getAIReply(
  userMessage: string,
  systemPrompt?: string
): Promise<{ reply: string; error?: string }> {
  const apiKey = process.env.OPENAI_API_KEY
  const baseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1'
  const model = process.env.AI_MODEL || 'gpt-4o-mini'

  if (!apiKey) {
    return { reply: '', error: 'AI API key not configured' }
  }

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content:
              systemPrompt ||
              'Bạn là trợ lý chăm sóc khách hàng thân thiện và chuyên nghiệp. Hãy trả lời ngắn gọn, rõ ràng và hữu ích bằng tiếng Việt. Nếu câu hỏi về sản phẩm/dịch vụ cụ thể mà bạn không biết, hãy đề nghị khách hàng liên hệ trực tiếp để được hỗ trợ tốt hơn.',
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { reply: '', error: data.error?.message || 'AI API error' }
    }

    const reply = data.choices?.[0]?.message?.content || ''
    return { reply }
  } catch (error) {
    return { reply: '', error: (error as Error).message }
  }
}
