import WebhookUtils from "./webhook.js";

export default class LoginUtils {
    static async generateLoginCode(client) {
        const generatedCode = Math.floor(Math.random() * 1000000000000000)
        await WebhookUtils.sendWebhookMessage(client.Webhooks.login, `Code: \`${generatedCode}\``);
        return client.LoginPassword = generatedCode;
    }

    static async checkPlayerInLoggedClients(client, playerName) {
        return client.Clients.logged.includes(playerName);
    }
}