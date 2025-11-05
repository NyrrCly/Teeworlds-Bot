import WebhookUtils from "../../core/utils/webhook.js";

export default class ModerationCommands {
    static async banCommand(client, banArgs, author){
        await WebhookUtils.sendWebhookMessage(client._LoggerWebhook, `\`${author}\` used '!ban ${banArgs}'`);
        await client.rcon.rcon(`ban ${banArgs}`);
    }

    static async kickCommand(client, banArgs, author){
        await WebhookUtils.sendWebhookMessage(client._LoggerWebhook, `\`${author}\` used '!kick ${banArgs}'`);
        await client.rcon.rcon(`kick ${banArgs}`);
    }
}