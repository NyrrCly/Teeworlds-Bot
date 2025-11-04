import LoginUtils from "../../core/utils/login.js";
import Chat from "../../core/utils/chat.js";
import WebhookUtils from "../../core/utils/webhook.js";

export default class LoginCommands {
    static async loginCommand(client, password, message) {
        const author = message.author.ClientInfo.name;

        if (client._LoginPassword === parseInt(password)) {
            await Chat.sendMessage(client, `/w ${author} You are logged in ♥`)
            await WebhookUtils.sendWebhookMessage(client._LoggerWebhook, `\`${author}\` used '!login'`);
            client._LoggedClients.push(author);
        }
        await LoginUtils.generateLoginCode(client)
    }
}