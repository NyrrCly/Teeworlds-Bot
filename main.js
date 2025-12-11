import addClient from "./src/core/handler/addClient.js";
import Chat from "./src/core/utils/client/chat.js";
import checkUtilsCommands from "./src/client/utils.js";
import checkLoginCommands from "./src/client/login.js";
import LoginUtils from "./src/core/utils/client/login.js";

const client = await addClient()

client.on('message', async (message) => {
    const checkPrefix = await Chat.checkMessagePrefix(message);

    const command = await Chat.checkMessageCommand(message);
    const commandName = command[0].toLowerCase();
    const commandArg = command[1];

    if (await Chat.checkLeaveMessage(message)) {
        for (const playerName of client.Clients.logged) {
            if (await Chat.checkPlayerNameInLeaveMessage(message, playerName)) {
                const getPlayerIndex = client.Clients.logged.findIndex(name => name === playerName);
                client.Clients.logged.splice(getPlayerIndex, 1);
            }
        }
    }

    await checkLoginCommands(client, commandName, commandArg, message);

    if (checkPrefix && commandName !== "login") {
        const checkAuthor = await LoginUtils.checkPlayerInLoggedClients(client, message.author.ClientInfo.name);
        if (!checkAuthor) return;

        const author = message.author.ClientInfo.name;

        await checkUtilsCommands(client, commandName, commandArg, author);
    }
});

process.on('SIGINT', async () => {
    for (const spamClient of client.Clients.spam) {
        if (spamClient && typeof spamClient.Disconnect === 'function') {
            await spamClient.Disconnect();
        }
    }
    await client.Disconnect();
    process.exit(0);
});