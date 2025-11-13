import Chat from "../../core/utils/client/chat.js";

export default class HelpCommands {
    static async sendHelp(client, author) {
        return await Chat.sendMessage(client, `/w ${author} Prefix: ! | Commands: Utils, Moderation, Troll`);
    }

    static async sendUtilsCommands(client, author) {
        return await Chat.sendMessage(client, `/w ${author} Commands: profile: "profile Aoe", spam: "spam 'Spam'"`);
    }

    static async sendModerationCommands(client, author) {
        return await Chat.sendMessage(client, `/w ${author} Commands: ban: "ban 'id time(minutes) reason'", kick: "kick 'id reason'", mute: "mute id time(seconds) reason'"`);
    }

    static async sendTrollCommands(client, author) {
        return await Chat.sendMessage(client, `/w ${author} Commands: 420: "420 id"`);
    }
}