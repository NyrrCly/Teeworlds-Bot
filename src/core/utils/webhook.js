import {WebhookClient} from "discord.js";
import config from "../configs/default.json" with {type: "json"};

export default class WebhookUtils {
    static async createWebhookClient() {
        return new WebhookClient({url: config.discord.login_code_webhook});
    }

    static async sendWebhookMessage(webhook, message) {
        await webhook.send({
            username: '***',
            avatarURL: 'https://png-pixel.com/1x1-ffffff7f.png',
            content: message,
        });
    }
}