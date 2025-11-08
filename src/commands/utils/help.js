import Chat from "../../core/utils/chat.js";
import WebhookUtils from "../../core/utils/webhook.js";

export default class HelpCommands {
    static async sendHelp(client, author){
        await WebhookUtils.sendWebhookMessage(client._LoggerWebhook, `\`${author}\` used '!help'`);
        return await Chat.sendMessage(client, `/w ${author} Prefix: ! | Commands: Utils, Login, Moderation, Troll`);
    }

    static async sendUtilsCommands(client, author){
        await WebhookUtils.sendWebhookMessage(client._LoggerWebhook, `\`${author}\` used '!help utils'`);
        return await Chat.sendMessage(client, `/w ${author} Commands: profile, spam`);
    }

    static async sendLoginCommands(client, author){
        await WebhookUtils.sendWebhookMessage(client._LoggerWebhook, `\`${author}\` used '!help login'`);
        return await Chat.sendMessage(client, `/w ${author} Commands: login`);
    }

    static async sendModerationCommands(client, author){
        await WebhookUtils.sendWebhookMessage(client._LoggerWebhook, `\`${author}\` used '!help moderation'`);
        return await Chat.sendMessage(client, `/w ${author} Commands: ban, kick`);
    }

    static async sendTrollCommands(client, author){
        await WebhookUtils.sendWebhookMessage(client._LoggerWebhook, `\`${author}\` used '!help troll'`);
        return await Chat.sendMessage(client, `/w ${author} Commands: 420`);
    }
}