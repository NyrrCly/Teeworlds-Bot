import Chat from "../core/utils/chat.js";
import PlayerCommands from "./utils/player.js";
import HelpCommands from "./utils/help.js";
import SpamCommands from "./utils/spam.js";

export default async function checkUtilsCommands(client, clients, commandName, commandArg, author) {
    switch (commandName) {
        case "profile":
            return await PlayerCommands.sendPlayerInfo(client, commandArg);
        case "help":
            if (commandArg.toLowerCase() === "utils") return await HelpCommands.sendUtilsCommands(client, author);
            if (commandArg.toLowerCase() === "login") return await HelpCommands.sendLoginCommands(client, author);
            return await HelpCommands.sendHelp(client, author);
        case "spam":
            if (commandArg === '') {
                await SpamCommands.stopSpamCommand(clients);
                return await Chat.sendMessage(client, `/w ${author} Spam stopped`);
            }
            clients = await SpamCommands.spamCommand(clients, commandArg);
            break;
        case "say":
            await Chat.sendMessage(client, commandArg);
            break;
        case "logout":
            return client._LoggedIn = false;
        default:
            return await Chat.sendMessage(client, `Unknown command`);
    }
}