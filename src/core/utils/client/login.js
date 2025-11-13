import WebhookUtils from "./webhook.js";

export default class LoginUtils {
    static async generateLoginCode(client) {
        const generatedCode = Math.floor(Math.random() * 1000000000000000)
        await WebhookUtils.sendWebhookMessage(client._LoginWebhook, `Code: \`${generatedCode}\``);
        return client._LoginPassword = generatedCode;
    }

    static async checkPlayerInLoggedClients(client, playerName) {
        return client._LoggedClients.includes(playerName);
    }
}