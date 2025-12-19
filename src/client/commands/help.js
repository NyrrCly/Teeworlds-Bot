import Chat from "../../core/utils/client/chat.js";

export default class HelpCommands {
    static async sendHelp(client, author) {
        return await Chat.sendMessage(client, `/w ${author} Prefix: ! | Commands: Utils, Moderation`);
    }

    static async sendUtilsCommands(client, author) {
        return await Chat.sendMessage(client, `/w ${author} Commands: profile: "profile Aoe", spam: "spam 'SW1PTYK sigma boy'"`);
    }

    static async sendModerationCommands(client, author) {
        return await Chat.sendMessage(client, `/w ${author} Commands: ban: "ban 'id time(minutes) reason'", kick: "kick 'id reason'", mute: "mute id time(seconds) reason'"`);
    }
}