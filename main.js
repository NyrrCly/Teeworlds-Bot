import addClient from "./src/core/handler/addClient.js";
import Chat from "./src/core/utils/client/chat.js";
import checkUtilsCommands from "./src/commands/utils.js";
import checkLoginCommands from "./src/commands/login.js";
import LoginUtils from "./src/core/utils/client/login.js";

const client = await addClient()

client.on('message', async (message) => {
    const checkPrefix = await Chat.checkMessagePrefix(message);

    const command = await Chat.checkMessageCommand(message);
    const commandName = command[0].toLowerCase();
    const commandArg = command[1];

    if (await Chat.checkLeaveMessage(message)) {
        for (const playerName of client._LoggedClients) {
            if (await Chat.checkPlayerNameInLeaveMessage(message, playerName)) {
                const getPlayerIndex = client._LoggedClients.findIndex(name => name === playerName);
                client._LoggedClients.splice(getPlayerIndex, 1);
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
    for (const spamClients of client._SpamClients) {
        if (client && typeof client.Disconnect === 'function') {
            await client.Disconnect();
        }
    }
    await client.Disconnect();
    process.exit(0);
});