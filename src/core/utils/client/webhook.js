import {MessageFlags, WebhookClient} from "discord.js";

export default class WebhookUtils {
    static async createWebhookClient(url) {
        return new WebhookClient({url: url});
    }

    static async sendWebhookComponents(webhook, components) {
        await webhook.send({
            username: '***',
            avatarURL: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png',
            components: [components],
            withComponents: true,
            flags: MessageFlags.IsComponentsV2
        });
    }
}