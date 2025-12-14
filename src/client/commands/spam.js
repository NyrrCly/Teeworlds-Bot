import addSpamClients from "../../core/handler/addSpamClients.js";

export default class SpamCommands {
    static async spamCommand(clients, message) {
        return addSpamClients(clients, message);
    }

    static async stopSpamCommand(clients) {
        for (const client of clients) {
            if (!client) continue;

            if (client.Intervals) {
                client.Intervals.forEach(clearInterval);
                client.Intervals = [];
            }

            if (client && typeof await client.Disconnect === 'function') {
                await client.Disconnect();
            }
        }
        clients.length = 0;
    }
}