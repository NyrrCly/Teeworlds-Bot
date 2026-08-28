import type { Client } from "teeworlds";
import { sendWebhookMessage } from "../../services/webhookCreate.js";
import { loginCode } from "../../elements/webhookComponents.js";

export async function generateCode(client: Client) {
    const generatedCode = Math.floor(Math.random() * 999999);
    await sendWebhookMessage(client.webhooks.login, loginCode(generatedCode.toString()));
    return client.loginPassword = generatedCode;
}