import LoginUtils from "../../core/utils/client/login.js";
import Chat from "../../core/utils/client/chat.js";

export default class LoginCommands {
    static async loginCommand(client, password, message) {
        const author = message.author.ClientInfo.name;
        if (client.LoginPassword === parseInt(password)) {
            await LoginUtils.generateLoginCode(client);
            Chat.sendMessage(client, `/w ${author} You are logged in ♥`);
            client.Clients.logged.push(author);
        }
    }
}