import addClient from "./src/core/handler/addClient.js";
import Chat from "./src/core/utils/client/chat.js";
import checkCommands from "./src/client/checkCommands.js";
import checkLoginCommands from "./src/client/checkLogin.js";
import LoginUtils from "./src/core/utils/client/login.js";
import Utils from "./src/core/utils/client/utils.js";

const client = await addClient();

client.on('message', async (message) => {
    const checkPrefix = Chat.checkMessagePrefix(message);

    const command = Chat.checkMessageCommand(message);
    const commandName = command[0].toLowerCase();
    const commandArg = command[1];

    const isLeaveMessage = Chat.checkLeaveMessage(message);

    if (isLeaveMessage) {
        for (const playerName of client.Clients.logged) {
            const isPlayerNameInLeaveMessage = Chat.checkPlayerNameInLeaveMessage(message, playerName);
            if (isPlayerNameInLeaveMessage) {
                const getPlayerIndex = client.Clients.logged.findIndex(name => name === playerName);
                client.Clients.logged.splice(getPlayerIndex, 1);
            }
        }
    }

    await checkLoginCommands(client, commandName, commandArg, message);

    if (checkPrefix && commandName !== "login") {
        const author = message?.author?.ClientInfo?.name;
        const checkAuthor = await LoginUtils.checkPlayerInLoggedClients(client, author);
        if (!checkAuthor) return;

        await Utils.interactionLogger(client, commandName, commandArg, author);
        await checkCommands(client, commandName, commandArg, author);
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