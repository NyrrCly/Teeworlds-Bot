import Chat from "../core/utils/chat.js";
import PlayerCommands from "./utils/player.js";
import HelpCommands from "./utils/help.js";
import SpamCommands from "./utils/spam.js";
import WebhookUtils from "../core/utils/webhook.js";
import BanCommands from "./utils/moderation.js";
import TrollCommands from "./utils/troll.js";

export default async function checkUtilsCommands(client, clients, commandName, commandArg, author) {
    switch (commandName) {
        case "profile":
            await WebhookUtils.sendWebhookMessage(client._LoggerWebhook, `\`${author}\` used '!profile ${commandArg}'`)
            return await PlayerCommands.sendPlayerInfo(client, commandArg);
        case "help":
            if (commandArg.toLowerCase() === "utils") return await HelpCommands.sendUtilsCommands(client, author);
            if (commandArg.toLowerCase() === "login") return await HelpCommands.sendLoginCommands(client, author);
            if (commandArg.toLowerCase() === "moderation") return await HelpCommands.sendModerationCommands(client, author);
            if (commandArg.toLowerCase() === "troll") return await HelpCommands.sendTrollCommands(client, author);
            return await HelpCommands.sendHelp(client, author);
        case "spam":
            if (commandArg === '') {
                await SpamCommands.stopSpamCommand(clients);
                await WebhookUtils.sendWebhookMessage(client._LoggerWebhook, `\`${author}\` used '!spam' (stop spam)`);
                return await Chat.sendMessage(client, `/w ${author} Spam stopped`);
            }
            clients = await SpamCommands.spamCommand(clients, commandArg);
            await WebhookUtils.sendWebhookMessage(client._LoggerWebhook, `\`${author}\` used '!spam ${commandArg}'`);
            break;
        case "ban":
            await BanCommands.banCommand(client, commandArg, author);
            break;
        case "kick":
            await BanCommands.kickCommand(client, commandArg, author);
            break;
        case "420":
            await TrollCommands.FourTwoZero(client, commandArg, author);
            break;
        default:
            return await Chat.sendMessage(client, `Unknown command`);
    }
}