import DDNetPlayerRequest from "../../core/utils/ddnet/request/player.js";
import Chat from "../../core/utils/chat.js";
import DDnetUtils from "../../core/utils/ddnet/ddnetUtils.js";

export default class PlayerCommands {
    static async sendPlayerInfo(client, nickname) {
        const player = await DDNetPlayerRequest.getPlayerDDStatsJson(nickname);
        if (!player) return await Chat.sendMessage(client, `Unknown player name`);

        const totalSecondsPlayed = player?.general_activity?.total_seconds_played;
        const playerHours = totalSecondsPlayed ? await DDnetUtils.playerHours(totalSecondsPlayed) : "Unknown";

        return await Chat.sendMessage(
            client, `${player.profile.name} profile: points: ${player.profile.points} | hours: ${playerHours}`
        );
    }
}