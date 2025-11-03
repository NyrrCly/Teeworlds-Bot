import Chat from "../../core/utils/chat.js";

export default class HelpCommands {
    static async sendHelp(client, author){
        return await Chat.sendMessage(client, `/w ${author} Prefix: ! | Commands: Utils, Login`);
    }

    static async sendUtilsCommands(client, author){
        return await Chat.sendMessage(client, `/w ${author} Commands: profile, spam, say`);
    }

    static async sendLoginCommands(client, author){
        return await Chat.sendMessage(client, `/w ${author} Commands: login, logout`);
    }
}