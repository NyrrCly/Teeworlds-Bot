import WebhookUtils from "../../core/utils/client/webhook.js";

export default class ModerationCommands {
    static async banCommand(client, banArgs, author) {
        await WebhookUtils.sendWebhookMessage(client.Webhooks.logger, `\`${author}\` used '!ban ${banArgs}'`);
        await client.rcon.rcon(`ban ${banArgs}`);
    }

    static async kickCommand(client, banArgs, author) {
        await WebhookUtils.sendWebhookMessage(client.Webhooks.logger, `\`${author}\` used '!kick ${banArgs}'`);
        await client.rcon.rcon(`kick ${banArgs}`);
    }

    static async muteCommand(client, banArgs, author) {
        await WebhookUtils.sendWebhookMessage(client.Webhooks.logger, `\`${author}\` used '!mute ${banArgs}'`);
        await client.rcon.rcon(`muteid ${banArgs}`);
    }
}