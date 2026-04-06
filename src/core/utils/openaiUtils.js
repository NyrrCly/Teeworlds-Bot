import config from "../../configs/default.json" with {type: "json"};
import logger from "./client/logger.js";

export default class OpenAIUtils {
    static async sendMessageToApi(client, message) {
        try {
            const completion = await client.AiApi.openRouter.chat.send({
                chatGenerationParams: {
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
                        ...client.AiApi.aiHistory
                    ],
                },
                stream: false
            });

            const reply = completion.choices[0].message.content;

            client.AiApi.aiHistory.push({
                role: "user",
                content: message
            });

            client.AiApi.aiHistory.push({
                role: "assistant",
                content: reply
            });

            return reply;
        } catch (error) {
            logger.error(error);
            return "OpenAI error, possibly a request limit";
        }
    }
}