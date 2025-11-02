import logger from "../../core/utils/logger.js";

export default class LoginCommands {
    static async loginCommand(client, password) {
        if (client._LoggedIn) return;
        if (client._LoginPassword === parseInt(password)) {
            client._LoggedIn = true
        }
        await this.generateLoginCode(client)
    }

    static async generateLoginCode(client) {
        const generatedCode = Math.floor(Math.random() * 1000000000000000)
        logger.info(`Login code: ${generatedCode}`);
        return client._LoginPassword = generatedCode;
    }
}