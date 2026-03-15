import config from "../../configs/default.json" with {type: "json"};

export default class OpenAIUtils {
    static async sendMessageToApi(client, message) {
        try {
            client.history.push({
                role: "user",
                content: message
            })

            const completion = await client.OpenRouter.chat.send({
                model: config.openAi.model,
                messages: [
                    {
                        role: 'system',
                        content: config.openAi.prompt
                    },
                    {
                        role: 'user',
                        content: message
                    },
                    ...client.history
                ],
                stream: false,
            });

            const reply = completion.choices[0].message.content;

            client.history.push({
                role: "assistant",
                content: reply
            });
        } catch(error) {
            return "OpenAI error, possibly a request limit";
        }
    }   
}