import teeworlds from "teeworlds";
import logger from "../utils/logger.js";
import config from "../configs/default.json" with {type: "json"};
import LoginUtils from "../utils/login.js";

const [ip, port] = config.server.address.split(':');

export default async function addClient() {
    const client = new teeworlds.Client(ip, Number(port), '');

    client.on('connected', () => {
        logger.info(`Connected. Address: ${ip}:${port}`);
    });

    client.on('disconnect', (reason) => {
        logger.info(`Disconnected. Reason: ${reason}`);
    });

    client.options = {
        ddnet_version: {
            version: config.tee.version,
            release_version: '(filoqcuscreatedthisselfbotfortests)'
        },
        identity: {
            name: config.tee.name,
            clan: config.tee.clan,
            country: config.tee.country,
            skin: config.tee.skin,
            use_custom_color: config.tee.use_custom_color,
            color_body: config.tee.color_body,
            color_feet: config.tee.color_feet,
        },
        password: config.tee.password,
    };

    client._LoginPassword = await LoginUtils.generateLoginCode(client);
    client._LoggedClients = [];

    await client.connect();
    return client;
}