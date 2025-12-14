import HelpCommands from "../../../client/commands/help.js";

export default class Utils {
    static async helpCommandHandler(client, commandArg, author) {
        if (commandArg.toLowerCase() === "utils") return await HelpCommands.sendUtilsCommands(client, author);
        if (commandArg.toLowerCase() === "moderation") return await HelpCommands.sendModerationCommands(client, author);
    }

    static async coinFlip(){
        const words = ["Heads (Орел)", "Tails (Решка)"]
        return words[Math.floor(Math.random() * words.length)];
    }
}