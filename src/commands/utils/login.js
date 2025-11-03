import LoginUtils from "../../core/utils/login.js";
import Chat from "../../core/utils/chat.js";

export default class LoginCommands {
    static async loginCommand(client, password, message) {
        if (client._LoginPassword === parseInt(password)) {
            await Chat.sendMessage(client, `/w ${message.author.ClientInfo.name} You are logged in ♥`)
            client._LoggedClients.push(message.author.ClientInfo.name);
        }
        await LoginUtils.generateLoginCode(client)
    }
}