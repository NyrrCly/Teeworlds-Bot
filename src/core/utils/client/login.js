import WebhookUtils from "./webhook.js";
import WebhookMessages from "../../elements/webhookMessages.js";
import config from "../../../configs/default.json" with {type: "json"};

export default class LoginUtils {
    static async generateLoginCode(client) {
        const generatedCode = Math.floor(Math.random() * 1000000000000000)
        await WebhookUtils.sendWebhookComponents(client.Webhooks.login, WebhookMessages.loginCode(generatedCode));
        return client.LoginPassword = generatedCode;
    }

    static checkPlayerInLoggedClients(client, playerName) {
        if(!config.bot.check_login_on_localhost) {
            if (config.server.address.includes("localhost")) return true;
        }
        return client.Clients.logged.includes(playerName);
    }
}