import {WebhookClient} from "discord.js";

export default class WebhookUtils {
    static async createWebhookClient(url) {
        return new WebhookClient({url: url});
    }

    static async sendWebhookMessage(webhook, message) {
        await webhook.send({
            username: '***',
            avatarURL: 'https://png-pixel.com/1x1-ffffff7f.png',
            content: message,
        });
    }
}