import { request } from "undici";
import { PlayerData } from "../../types/types.js";

export async function getPlayerData(
  playerNickname: string,
): Promise<PlayerData | null> {
  try {
    const { body, statusCode } = await request(
      `https://ddstats.tw/player/json?player=${encodeURIComponent(playerNickname)}`,
    );
    if (statusCode !== 200) return null;
    return (await body.json()) as PlayerData;
  } catch (error) {
    console.error(error);
    return null;
  }
}
