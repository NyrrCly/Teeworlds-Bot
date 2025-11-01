// noinspection D

import addClient from "./src/core/handler/addClient.js";
import Chat from "./src/core/handler/chat.js";
import Commands from "./src/core/client/commands.js";
import config from "./src/core/configs/default.json" with {type: "json"};

const client = await addClient()
let clients = []

client.on('message', async (message) => {
    const checkAuthor = await Chat.checkMessageAuthor(message);
    const checkPrefix = await Chat.checkMessagePrefix(message);

    if (checkPrefix) {
        const command = await Chat.checkMessageCommand(message);
        const commandName = command[0].toLowerCase();
        const commandArg = command[1];
        if (checkAuthor && checkPrefix) {
            switch (commandName) {
                case "profile":
                    return await Commands.sendPlayerInfo(client, commandArg)
                case "help":
                    if (commandArg.toLowerCase() === "utils") {
                        return await Commands.sendUtilsCommands(client);
                    }
                    return await Commands.sendHelp(client);
                case "spam":
                    if (commandArg === '') {
                        await Commands.stopSpamCommand(clients);
                        return await Chat.sendMessage(client, `/w ${config.chat.owner_name} Spam stopped`);
                    }
                    clients = await Commands.spamCommand(clients, commandArg);
                    break;
                case "say":
                    await Chat.sendMessage(client, commandArg.toString());
                    break;
                default:
                    return await Chat.sendMessage(client, `Unknown command`);
            }
        }
    }
});

process.on('SIGINT', async () => {
    for (const client of clients) {
        if (client && typeof client.Disconnect === 'function') {
            await client.Disconnect();
        }
    }
    await client.Disconnect();
    process.exit(0);
});