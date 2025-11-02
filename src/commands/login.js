import LoginCommands from "./utils/login.js";

export default async function checkLoginCommands(client, clients, commandName, commandArg) {
    switch (commandName) {
        case "login":
            if (commandArg === 0) return;
            if (commandArg === '') return;
            return await LoginCommands.loginCommand(client, commandArg);
        default:
            return;
    }
}