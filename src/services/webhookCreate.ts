import { WebhookClient, MessageFlags, BaseMessageOptions } from "discord.js";
import ComponentsBuilder from "../shared/builders/ComponentsBuilder.js";

export function createWebhookClient(url: string) {
  return new WebhookClient({
    url: url,
  });
}

export async function sendWebhookMessage(
  webhook: WebhookClient,
  components: ComponentsBuilder,
) {
  await webhook.send({
    username: "***",
    avatarURL: "https://upload.wikimedia.org/wikipedia/commons/c/ca/1x1.png",
    components: [components],
    withComponents: true,
    flags: MessageFlags.IsComponentsV2,
  });
}
