import LoginUtils from "../../core/utils/login.js";

export default class LoginCommands {
    static async loginCommand(client, password, message) {
        if (client._LoginPassword === parseInt(password)) {
            client._LoggedClients.push(message.author.ClientInfo.name);
        }
        await LoginUtils.generateLoginCode(client)
    }
}