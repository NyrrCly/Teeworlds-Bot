import config from "../configs/default.json" with {type: "json"};

export default class Chat {

    static async sendMessage(client, message) {
        client.game.Say(message, false);
    }
    static async checkMessageAuthor(message) {
        if (message.author?.ClientInfo === undefined) return false;
        return message.author.ClientInfo.name === config.chat.owner_name ;
    }

    static async checkMessagePrefix(message) {
        if (message.author?.ClientInfo === undefined) return false;
        return message.message.startsWith(config.chat.prefix);
    }

    static async checkMessageCommand(message) {
        const input = message.message.slice(config.chat.prefix.length).trim();
        const [command, ...rest] = input.split(/\s+/);
        const arg = rest.join(" ").replace(/^"|"$/g, '');

        return [command, arg];
    }
}