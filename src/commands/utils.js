import Chat from "../core/handler/chat.js";
import config from "../core/configs/default.json" with {type: "json"};
import PlayerCommands from "./utils/player.js";
import HelpCommands from "./utils/help.js";
import SpamCommands from "./utils/spam.js";

export default async function checkUtilsCommands(client, clients, commandName, commandArg) {
    switch (commandName) {
        case "profile":
            return await PlayerCommands.sendPlayerInfo(client, commandArg);
        case "help":
            if (commandArg.toLowerCase() === "utils") return await HelpCommands.sendUtilsCommands(client);
            if (commandArg.toLowerCase() === "login") return await HelpCommands.sendLoginCommands(client);
            return await HelpCommands.sendHelp(client);
        case "spam":
            if (commandArg === '') {
                await SpamCommands.stopSpamCommand(clients);
                return await Chat.sendMessage(client, `/w ${config.chat.owner_name} Spam stopped`);
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