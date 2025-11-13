import LoginUtils from "../../core/utils/client/login.js";
import Chat from "../../core/utils/client/chat.js";
import WebhookUtils from "../../core/utils/client/webhook.js";

export default class LoginCommands {
    static async loginCommand(client, password, message) {
        const author = message.author.ClientInfo.name;

        if (client._LoginPassword === parseInt(password)) {
            await LoginUtils.generateLoginCode(client);
            await Chat.sendMessage(client, `/w ${author} You are logged in ♥`);
            await WebhookUtils.sendWebhookMessage(client._LoggerWebhook, `\`${author}\` used '!login'`);
            client._LoggedClients.push(author);
        }
    }
}