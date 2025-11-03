import WebhookUtils from "./webhook.js";

const webhook = await WebhookUtils.createWebhookClient()

export default class LoginUtils {
    static async generateLoginCode(client) {
        const generatedCode = Math.floor(Math.random() * 1000000000000000)
        await WebhookUtils.sendWebhookMessage(webhook, `Code: \`${generatedCode}\``);
        return client._LoginPassword = generatedCode;
    }

    static async checkPlayerInLoggedClients(client, playerName) {
        return client._LoggedClients.includes(playerName);
    }
}