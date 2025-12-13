import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateBlogContent(topic: string, style: string = 'minimalist') {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You are a skilled blog writer with a ${style} writing style. Write engaging, thoughtful content that is SEO-optimized and easy to read.`,
      },
      {
        role: 'user',
        content: `Write a blog post about: ${topic}. Include:
        - An engaging title
        - A compelling introduction
        - 3-5 main sections with subheadings
        - A conclusion
        - Meta description for SEO (max 160 characters)

        Format the response as JSON with fields: title, metaDescription, content (HTML formatted)`,
      },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  })

  return completion.choices[0].message.content
}

export async function generateExcerpt(content: string, maxLength: number = 200) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Summarize this blog content in ${maxLength} characters or less, making it engaging and click-worthy: ${content.slice(0, 1000)}`,
      },
    ],
    temperature: 0.5,
    max_tokens: 100,
  })

  return completion.choices[0].message.content
}
