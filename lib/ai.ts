import { generateText } from 'ai'

const DEFAULT_SYSTEM_PROMPT =
  'Bạn là trợ lý chăm sóc khách hàng thân thiện và chuyên nghiệp. Hãy trả lời ngắn gọn, rõ ràng và hữu ích bằng tiếng Việt. Nếu câu hỏi về sản phẩm/dịch vụ cụ thể mà bạn không biết, hãy đề nghị khách hàng liên hệ trực tiếp để được hỗ trợ tốt hơn.'

export async function getAIReply(
  userMessage: string,
  systemPrompt?: string
): Promise<{ reply: string; error?: string }> {
  try {
    const { text } = await generateText({
      // Vercel AI Gateway — no provider package needed, AI_GATEWAY_API_KEY is auto-read
      model: 'google/gemini-2.5-pro',
      system: systemPrompt || DEFAULT_SYSTEM_PROMPT,
      prompt: userMessage,
      maxTokens: 500,
    })

    return { reply: text }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown AI error'
    return { reply: '', error: message }
  }
}
