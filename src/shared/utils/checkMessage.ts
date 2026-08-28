import { iMessage } from "../../types/types.js";
import config from "../../configs/config.json" with {type: "json"};

export function checkMessagePrefix(message: iMessage) {
    if (message.author?.ClientInfo === undefined) return false;
    return message.message.startsWith(config.chat.prefix);
}

export function checkMessageCommand(message: iMessage) {
    const input = message.message.slice(config.chat.prefix.length).trim();
    const [commandName, ...rest] = input.split(/\s+/);
    const commandArg = rest.join(" ").replace(/^"|"$/g, '');

    return {commandName, commandArg};
}

export function checkLeaveMessage(message: iMessage) {
    if (message.client_id !== -1) return false;
    const checks = ["left", "-"];
    for (const check of checks) {
        if (message.message.includes(check)) return true;
    }
    return false;
}

export function checkPlayerNameInLeaveMessage(message: iMessage, playerName: string) {
    if (message.message.includes("[D]")) return false;
    return message.message.includes(playerName);
}