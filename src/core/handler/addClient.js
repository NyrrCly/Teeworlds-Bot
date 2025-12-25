import {OpenRouter} from "@openrouter/sdk";
import teeworlds from "teeworlds";
import logger from "../utils/client/logger.js";
import LoginUtils from "../utils/client/login.js";
import WebhookUtils from "../utils/client/webhook.js";
import config from "../../configs/default.json" with {type: "json"};

const [ip, port] = config.server.address.split(':');

export default async function addClient() {
    const client = new teeworlds.Client(ip, parseInt(port), '', {
        ddnet_version: {
            version: config.tee.version,
            release_version: '(nyrrclycreatedthisbotfortests)'
        },
        identity: {
            name: config.tee.name,
            clan: config.tee.clan,
            country: config.tee.country,
            skin: config.tee.skin,
            use_custom_color: config.tee.use_custom_color,
            color_body: config.tee.color_body,
            color_feet: config.tee.color_feet
        },
        password: config.server.password,
    });

    client.on('connected', () => {
        logger.info(`Connected. Address: ${ip}:${port}`);
    });

    client.on('disconnect', (reason) => {
        logger.info(`Disconnected. Reason: ${reason}`);
    });

    client.Webhooks = {
        login: await WebhookUtils.createWebhookClient(config.discord.login_code_webhook),
        logger: await WebhookUtils.createWebhookClient(config.discord.logger_webhook)
    }
    client.Clients = {
        logged: [],
        spam: []
    }
    client.LoginPassword = await LoginUtils.generateLoginCode(client);
    client.OpenRouter = new OpenRouter({
        apiKey: config.api.open_router
    });

    client.rcon.auth(config.rcon.name, config.rcon.password);

    await client.connect();
    return client;
}