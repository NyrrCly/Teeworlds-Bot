import Chat from "../core/utils/client/chat.js";
import PlayerCommands from "./commands/player.js";
import HelpCommands from "./commands/help.js";
import SpamCommands from "./commands/spam.js";
import ModerationCommands from "./commands/moderation.js";
import OpenAICommands from "./commands/openAI.js";
import Utils from "../core/utils/client/utils.js";

export default async function checkCommands(client, commandName, commandArg, author) {
    switch (commandName) {
        case "profile":
            return await PlayerCommands.sendPlayerInfo(client, commandArg);
        case "help":
            if (commandArg.toLowerCase() !== '') return await Utils.helpCommandHandler(client, commandArg, author);
            return await HelpCommands.sendHelp(client, author);
        case "spam":
            if (commandArg === '') return await SpamCommands.stopSpamCommand(client.Clients.spam);
            return client.Clients.spam = await SpamCommands.spamCommand(client.Clients.spam, commandArg);
        case "coinflip":
            return Chat.sendMessage(client, `${author}: ${await Utils.coinFlip()}`);
        case "8ball":
            return Chat.sendMessage(client, `${author}: ${await Utils.eightBall()}`);
        case "openai":
            return await OpenAICommands.getInfo(client, commandArg, author);

        case "ban":
            return await ModerationCommands.banCommand(client, commandArg, author);
        case "kick":
            return await ModerationCommands.kickCommand(client, commandArg, author);
        case "mute":
            return await ModerationCommands.muteCommand(client, commandArg, author);
        default:
            return Chat.sendMessage(client, `Unknown command`);
    }
}