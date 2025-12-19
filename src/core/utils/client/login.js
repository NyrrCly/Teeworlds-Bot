import WebhookUtils from "./webhook.js";
import WebhookMessages from "../../elements/webhookMessages.js";

export default class LoginUtils {
    static async generateLoginCode(client) {
        const generatedCode = Math.floor(Math.random() * 1000000000000000)
        await WebhookUtils.sendWebhookComponents(client.Webhooks.login, WebhookMessages.loginCode(generatedCode));
        return client.LoginPassword = generatedCode;
    }

    static checkPlayerInLoggedClients(client, playerName) {
        return client.Clients.logged.includes(playerName);
    }
}