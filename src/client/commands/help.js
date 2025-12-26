import Chat from "../../core/utils/client/chat.js";

export default class HelpCommands {
    static async sendHelp(client, author) {
        return Chat.sendMessage(client, `/w ${author} Prefix: ! | Commands: Utils, Moderation`);
    }

    static async sendUtilsCommands(client, author) {
        return Chat.sendMessage(client, `/w ${author} Commands: profile - Example: !profile Aoe | spam - Example: !spam 'SW1PTYK sigma boy' | coinflip | openai - Example: !openai Hello!`);
    }

    static async sendModerationCommands(client, author) {
        return Chat.sendMessage(client, `/w ${author} Commands: ban - Example: !ban 'id time(minutes) reason' | kick - Example: !kick 'id reason' | mute - Example: !mute id time(seconds) reason'`);
    }
}