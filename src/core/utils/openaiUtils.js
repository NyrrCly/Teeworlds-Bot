export default class OpenAIUtils {
    static async sendMessageToApi(client, message) {
        const completion = await client.OpenRouter.chat.send({
            model: 'tngtech/deepseek-r1t2-chimera:free',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant. Keep your answers brief (max. 220 characters).'
                },
                {
                    role: 'user',
                    content: `Reply to "${message}" in the user's language, max. 220 characters, no emojis or emotions`
                }
            ],
            stream: false,
        });
        return completion.choices[0].message.content
    }
}