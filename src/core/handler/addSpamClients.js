import teeworlds from "teeworlds";
import config from "../../configs/default.json" with {type: "json"};
import Chat from "../utils/client/chat.js";

const [ip, port] = config.server.address.split(':');

export default async function addSpamClients(clients, message) {
    for (let i = 0; i < 4; i++) {
        const client = new teeworlds.Client(ip, Number(port), 'SPAMBOTS', {
            ddnet_version: {
                version: config.tee.version,
                release_version: '(spambotbynyrrcly)'
            },
            identity: {
                name: "SPAMBOTS",
                clan: "SPAMBOTS",
                country: config.tee.country,
                skin: config.tee.skin,
                use_custom_color: config.tee.use_custom_color,
                color_body: config.tee.color_body,
                color_feet: config.tee.color_feet,
            },
            password: config.server.password,
        });

        client.Intervals = [
            setInterval(() => {
                Chat.sendMessage(client, `${message}`);
            }, 6000),

            setInterval(() => {
                client.game.ChangePlayerInfo({
                    name: (Math.floor(Math.random() * 10000000000)).toString(),
                    clan: client.options.identity.clan,
                    country: client.options.identity.country,
                    skin: client.options.identity.skin,
                    use_custom_color: client.options.identity.use_custom_color,
                    color_body: client.options.identity.color_body,
                    color_feet: client.options.identity.color_feet
                })
            }, 20000)
        ];

        await client.connect();
        clients.push(client);
    }
    return clients;
}