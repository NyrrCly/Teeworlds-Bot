import DDNetPlayerRequest from "../utils/ddnet/request/player.js";
import Chat from "../handler/chat.js";
import config from "../configs/default.json" with {type: "json"};
import addSpamClients from "../handler/addSpamClients.js";
import DDnetUtils from "../utils/ddnet/ddnetUtils.js";

export default class Commands {
    static async sendHelp(client){
        return await Chat.sendMessage(client, `/w ${config.chat.owner_name} Prefix: ! | Commands: Utils`);
    }

    static async sendUtilsCommands(client){
        return await Chat.sendMessage(client, `/w ${config.chat.owner_name} Commands: profile, spam`);
    }

    static async sendPlayerInfo(client, nickname) {
        const player = await DDNetPlayerRequest.getPlayerDDStatsJson(nickname)
        if (!player) return await Chat.sendMessage(client, `/w ${config.chat.owner_name} Unknown player name`);
        const playerHours = await DDnetUtils.playerHours(player.general_activity.total_seconds_played)
        return await Chat.sendMessage(client, `${player.profile.name} profile: points: ${player.profile.points} | hours: ${playerHours}`);
    }

    static async spamCommand(clients, message) {
        return addSpamClients(clients, message);
    }

    static async stopSpamCommand(clients) {
        for (const client of clients) {
            if (!client) continue;

            if (client._intervals) {
                client._intervals.forEach(clearInterval);
                client._intervals = [];
            }

            if (client && typeof await client.Disconnect === 'function') {
                await client.Disconnect();
            }
        }
        clients.length = 0;
    }
}