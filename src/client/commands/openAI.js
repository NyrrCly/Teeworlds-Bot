import Chat from "../../core/utils/client/chat.js";
import OpenAIUtils from "../../core/utils/openaiUtils.js";

export default class OpenAICommands {
    static async getInfo(client, message, author) {
        const openAIAnswer = await OpenAIUtils.sendMessageToApi(client, message)
        return Chat.sendMessage(client, `${author}: ${openAIAnswer}`);
    }
}