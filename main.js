import addClient from "./src/core/handler/addClient.js";
import Chat from "./src/core/utils/chat.js";
import checkUtilsCommands from "./src/commands/utils.js";
import checkLoginCommands from "./src/commands/login.js";
import LoginUtils from "./src/core/utils/login.js";

const client = await addClient()
let clients = []

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

    await checkLoginCommands(client, clients, commandName, commandArg, message)

    if (checkPrefix && commandName !== "login") {
        const checkAuthor = await LoginUtils.checkPlayerInLoggedClients(client, message.author.ClientInfo.name);

        if (!checkAuthor) return;
        await checkUtilsCommands(client, clients, commandName, commandArg, message.author.ClientInfo.name);
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