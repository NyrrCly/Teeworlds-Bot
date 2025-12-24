import DDNetPlayerRequest from "../../core/utils/request/ddnet/player.js";
import Chat from "../../core/utils/client/chat.js";
import DDNetUtils from "../../core/utils/ddnetUtils.js";

export default class PlayerCommands {
    static async sendPlayerInfo(client, nickname) {
        const player = await DDNetPlayerRequest.getPlayerDDStatsJson(nickname);
        if (!player) return Chat.sendMessage(client, `Unknown player name`);

        const totalSecondsPlayed = player?.general_activity?.total_seconds_played;
        const playerHours = totalSecondsPlayed ? await DDNetUtils.playerHours(totalSecondsPlayed) : "Unknown";

        return Chat.sendMessage(
            client, `${player.profile.name} profile: points: ${player.profile.points} | hours: ${playerHours}`
        );
    }
}