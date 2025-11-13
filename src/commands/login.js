import LoginCommands from "./utils/login.js";
import LoginUtils from "../core/utils/client/login.js";

export default async function checkLoginCommands(client, commandName, commandArg, message) {
    switch (commandName) {
        case "login":
            if (commandArg === 0) return;
            if (commandArg === '') return;
            if (await LoginUtils.checkPlayerInLoggedClients(client, message.author.ClientInfo.name)) return;

            return await LoginCommands.loginCommand(client, commandArg, message);
        default:
            return;
    }
}