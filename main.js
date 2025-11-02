import addClient from "./src/core/handler/addClient.js";
import Chat from "./src/core/handler/chat.js";
import checkUtilsCommands from "./src/commands/utils.js";
import checkLoginCommands from "./src/commands/login.js";

const client = await addClient()
let clients = []

client.on('message', async (message) => {
    const checkAuthor = await Chat.checkMessageAuthor(message);
    const checkPrefix = await Chat.checkMessagePrefix(message);

    const command = await Chat.checkMessageCommand(message);
    const commandName = command[0].toLowerCase();
    const commandArg = command[1];

    if (checkPrefix && checkAuthor && client._LoggedIn) {
        await checkUtilsCommands(client, clients, commandName, commandArg);
    }

    /*
    TODO: Кожен раз як логіняться робить новий логін,
     хто ввів цей логін - добавляти в список client._LoggedClient,
      коли чел ліває, видаляти його зі списку

    TODO: Добавити Webhook для того щоб паролі для логіну приходили у діскорд
    */
    await checkLoginCommands(client, clients, commandName, commandArg)
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