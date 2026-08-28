import { WebhookClient } from "discord.js"

declare module "teeworlds" {
  interface Client {
    webhooks: {
        login: WebhookClient
        logger: WebhookClient
    };
    clients: {
        logged: string[]
    };
    loginPassword: number;
  }
}