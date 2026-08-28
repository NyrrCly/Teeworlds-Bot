import { Client } from "teeworlds";
import { iOptions } from "../types/types.js"
import { createWebhookClient } from "./webhookCreate.js"
import config from "../configs/config.json" with {type: "json"};
import { generateCode } from "../shared/utils/generateCode.js";

export class TWClient {
    public client: Client
    readonly ip: string
    readonly port: number
    constructor (ip: string, port: number, options: iOptions) {
        this.ip = ip;
        this.port = port;
        this.client = new Client(ip, port, '', options)
    }

    async connect() {
        this.client.on('connected', () => {
            console.log(`Connected: ${this.ip}:${this.port}`)
        })

        this.client.on('disconnect', (reason) => {
            console.log(`Disconnected: ${reason}`)
        })

        this.client.webhooks = {
            login: createWebhookClient(config.discord.login_code_webhook),
            logger: createWebhookClient(config.discord.logger_webhook)
        }
        this.client.clients = {
            logged: []
        }
        this.client.rcon.auth(config.rcon.name, config.rcon.password);

        await generateCode(this.client);
        await this.client.connect();
    }

    sendMessage(message: string) {
        this.client.game.Say(message, false);
    }
}