import Chat from "../core/utils/client/chat.js";
import PlayerCommands from "./commands/player.js";
import HelpCommands from "./commands/help.js";
import SpamCommands from "./commands/spam.js";
import WebhookUtils from "../core/utils/client/webhook.js";
import ModerationCommands from "./commands/moderation.js";
import Utils from "../core/utils/client/utils.js";

export default async function checkUtilsCommands(client, commandName, commandArg, author) {
    switch (commandName) {
        //Utils Commands

        case "profile":
            await WebhookUtils.sendWebhookMessage(client.Webhooks.logger, `\`${author}\` used '!profile ${commandArg}'`)
            return await PlayerCommands.sendPlayerInfo(client, commandArg);
        case "help":
            if (commandArg.toLowerCase() !== '') return await Utils.helpCommandHandler(client, commandArg, author);
            return await HelpCommands.sendHelp(client, author);
        case "spam":
            if (commandArg === '') {
                await SpamCommands.stopSpamCommand(client.Clients.spam);
                await WebhookUtils.sendWebhookMessage(client.Webhooks.logger, `\`${author}\` used '!spam' (stop spam)`);
                return await Chat.sendMessage(client, `/w ${author} Spam stopped`);
            }
            client.Clients.spam = await SpamCommands.spamCommand(client.Clients.spam, commandArg);
            await WebhookUtils.sendWebhookMessage(client.Webhooks.logger, `\`${author}\` used '!spam ${commandArg}'`);
            break;

        //Moderation Commands

        case "ban":
            await ModerationCommands.banCommand(client, commandArg, author);
            break;
        case "kick":
            await ModerationCommands.kickCommand(client, commandArg, author);
            break;
        case "mute":
            await ModerationCommands.muteCommand(client, commandArg, author);
            break;

        //Troll Commands
        case "coinflip":
            await Chat.sendMessage(client, `${author}: ${await Utils.coinFlip()}`);
            break;
        default:
            return await Chat.sendMessage(client, `Unknown command`);
    }
}