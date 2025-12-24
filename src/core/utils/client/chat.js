import config from "../../../configs/default.json" with {type: "json"};

export default class Chat {
    static sendMessage(client, message) {
        return client.game.Say(message, false);
    }

    static checkMessagePrefix(message) {
        if (message.author?.ClientInfo === undefined) return false;
        return message.message.startsWith(config.chat.prefix);
    }

    static checkMessageCommand(message) {
        const input = message.message.slice(config.chat.prefix.length).trim();
        const [command, ...rest] = input.split(/\s+/);
        const arg = rest.join(" ").replace(/^"|"$/g, '');

        return [command, arg];
    }

    static checkLeaveMessage(message) {
        if (message.client_id !== -1) return false;
        const checks = ["left", "-"];
        for (const check of checks) {
            if (message.message.includes(check)) return true;
        }
    }

    static checkPlayerNameInLeaveMessage(message, playerName) {
        if (message.message.includes("[D]")) return false;
        return message.message.includes(playerName);
    }
}