import { TWClient } from "./services/clientCreate.js";
import config from "./configs/config.json" with { type: "json" };
import {
  checkLeaveMessage,
  checkMessageCommand,
  checkMessagePrefix,
} from "./shared/utils/checkMessage.js";
import {
  checkLoggedPlayers,
  isPlayerInLoggedClients,
} from "./shared/utils/checkLoggedPlayers.js";
import { checkCommands } from "./services/checkCommands.js";
import { sendWebhookMessage } from "./services/webhookCreate.js";
import { log } from "./elements/webhookComponents.js";

const client = new TWClient(
  config.server.ip,
  config.server.port,
  config.options,
);
await client.connect();

client.client.on("message", async (message) => {
  if (checkLeaveMessage(message))
    return checkLoggedPlayers(message, client.client);

  const isCorrectPrefix = checkMessagePrefix(message);

  if (isCorrectPrefix) {
    const { commandName, commandArg } = checkMessageCommand(message);
    if (commandName === "login")
      return checkCommands(client, commandName, commandArg, message);

    const author = message?.author?.ClientInfo?.name;
    if (
      !isPlayerInLoggedClients(client.client, author) &&
      config.bot.check_login_on_localhost
    )
      return;

    await sendWebhookMessage(
      client.client.webhooks.logger,
      log(commandName, commandArg, author),
    );
    await checkCommands(client, commandName, commandArg, message);
  }
});

process.on("SIGINT", async () => {
  await client.client.Disconnect();
  process.exit(0);
});
