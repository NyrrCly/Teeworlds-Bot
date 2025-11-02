import Chat from "../../core/handler/chat.js";
import config from "../../core/configs/default.json" with {type: "json"};

export default class HelpCommands {
    static async sendHelp(client){
        return await Chat.sendMessage(client, `/w ${config.chat.owner_name} Prefix: ! | Commands: Utils, Login`);
    }

    static async sendUtilsCommands(client){
        return await Chat.sendMessage(client, `/w ${config.chat.owner_name} Commands: profile, spam, say`);
    }

    static async sendLoginCommands(client){
        return await Chat.sendMessage(client, `/w ${config.chat.owner_name} Commands: login, logout`);
    }
}