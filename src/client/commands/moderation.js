export default class ModerationCommands {
    static async banCommand(client, banArgs) {
        client.rcon.rcon(`ban ${banArgs}`);
    }

    static async kickCommand(client, banArgs) {
        client.rcon.rcon(`kick ${banArgs}`);
    }

    static async muteCommand(client, banArgs) {
        client.rcon.rcon(`muteid ${banArgs}`);
    }
}