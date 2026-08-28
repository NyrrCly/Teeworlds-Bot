import { Client } from "teeworlds";
import { generateCode } from "../shared/utils/generateCode.js";
import config from "../configs/config.json" with {type: "json"};
import { TWClient } from "./clientCreate.js";
import { getPlayerData } from "./api/ddstats.js";
import { PlayerData } from "../types/types.js";
import { playerHours } from "../shared/utils/ddnetUtils.js";

export async function login(client: TWClient, password: string, author: string) {
    if (client.client.loginPassword.toString() === password) {
        await generateCode(client.client);
        client.sendMessage(`/w ${author} You are logged in ♥`)
        client.client.clients.logged.push(author);
    }
}

export function help(client: TWClient, author: string) {
    return client.sendMessage(`/w ${author} Prefix: ${config.chat.prefix} | categories: Utils, Moderation | Example: help utils`);
}

export function utilsHelp(client: TWClient, author: string) {
    return client.sendMessage(`/w ${author} Commands: profile - Example: !profile Aoe | coinflip | 8ball`)
}

export function moderationHelp(client: TWClient, author: string) {
    return client.sendMessage(`/w ${author} Commands: ban '<id> <time(minutes)> <reason>' | kick '<id> <reason>' | mute '<id> <time(seconds)> <reason>'`)
}

export function ban(client: Client, args: string) {
    client.rcon.rcon(`ban ${args}`)
}

export function kick(client: Client, args: string) {
    client.rcon.rcon(`kick ${args}`)
}

export function mute(client: Client, args: string) {
    client.rcon.rcon(`muteid ${args}`)
}

export async function profile(client: TWClient, playerNickname: string) {
    const playerData = await getPlayerData(playerNickname);
    if (!playerData) return client.sendMessage(`Unknown player name: ${playerNickname}`);

    const totalSecondsPlayed = playerData?.general_activity?.total_seconds_played;
    const totalHoursPlayed = totalSecondsPlayed ? playerHours(totalSecondsPlayed) : "Unknown";

    return client.sendMessage(`${playerData.profile.name} profile: points: ${playerData.profile.points} | hours: ${totalHoursPlayed}`);
}