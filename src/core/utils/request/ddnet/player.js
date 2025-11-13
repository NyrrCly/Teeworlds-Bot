import {request} from "undici";
import logger from "../../client/logger.js";

export default class DDNetPlayerRequest {
    static async getPlayerDDStatsJson(playerNickname) {
        try {
            const {
                body,
                statusCode
            } = await request(`https://ddstats.tw/player/json?player=${encodeURIComponent(playerNickname)}`);
            if (statusCode !== 200) return null;
            return await body.json();
        } catch (error) {
            logger.error(error);
        }
    }
}