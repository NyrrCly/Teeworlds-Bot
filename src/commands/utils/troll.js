import WebhookUtils from "../../core/utils/client/webhook.js";

export default class TrollCommands {
    static async FourTwoZero(client, id, author) {
        await WebhookUtils.sendWebhookMessage(client._LoggerWebhook, `\`${author}\` used '!420 ${id}'`);
        await client.rcon.rcon(`420 ${id} 1`);
    }
}