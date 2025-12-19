import HelpCommands from "../../../client/commands/help.js";
import WebhookUtils from "../../../core/utils/client/webhook.js";
import WebhookMessages from "../../elements/webhookMessages.js";

export default class Utils {
    static async helpCommandHandler(client, commandArg, author) {
        if (commandArg.toLowerCase() === "utils") return await HelpCommands.sendUtilsCommands(client, author);
        if (commandArg.toLowerCase() === "moderation") return await HelpCommands.sendModerationCommands(client, author);
    }

    static async coinFlip() {
        const words = ["Heads (Орел)", "Tails (Решка)"]
        return words[Math.floor(Math.random() * words.length)];
    }

    static async interactionLogger(client, commandName, commandArg, author) {
        return await WebhookUtils.sendWebhookComponents(client.Webhooks.logger, WebhookMessages.commandUsed(commandName, commandArg, author));
    }
}