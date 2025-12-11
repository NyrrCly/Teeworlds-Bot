import LoginUtils from "../../core/utils/client/login.js";
import Chat from "../../core/utils/client/chat.js";
import WebhookUtils from "../../core/utils/client/webhook.js";

export default class LoginCommands {
    static async loginCommand(client, password, message) {
        const author = message.author.ClientInfo.name;

        if (client.LoginPassword === parseInt(password)) {
            await LoginUtils.generateLoginCode(client);
            await Chat.sendMessage(client, `/w ${author} You are logged in ♥`);
            await WebhookUtils.sendWebhookMessage(client.Webhooks.logger, `\`${author}\` used '!login'`);
            client.Clients.logged.push(author);
        }
    }
}