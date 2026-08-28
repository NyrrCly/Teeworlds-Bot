import { isPlayerInLoggedClients } from "../shared/utils/checkLoggedPlayers.js";
import { iMessage } from "../types/types.js";
import { TWClient } from "./clientCreate.js";
import {
  ban,
  help,
  kick,
  login,
  moderationHelp,
  mute,
  profile,
  utilsHelp,
} from "./clientCommands.js";
import { coinFlip, eightBall } from "../shared/utils/miniGames.js";

export async function checkCommands(
  client: TWClient,
  commandName: string,
  commandArg: string,
  message: iMessage,
) {
  const author = message.author?.ClientInfo?.name ?? "Unknown";
  switch (commandName) {
    case "login": {
      if (
        isPlayerInLoggedClients(
          client.client,
          message.author?.ClientInfo?.name ?? "smallnicknamethatuseintest",
        )
      )
        return;
      await login(client, commandArg, message.author?.ClientInfo?.name!);
    }
    case "help": {
      if (commandArg.toLowerCase() === "utils")
        return utilsHelp(client, author);
      if (commandArg.toLowerCase() === "moderation")
        return moderationHelp(client, author);
      return help(client, author);
    }
    case "profile":
      return profile(client, commandArg);
    case "coinflip":
      return client.sendMessage(`${author}: ${coinFlip()}`);
    case "8ball":
      return client.sendMessage(`${author}: ${eightBall()}`);
    case "ban":
      return ban(client.client, commandArg);
    case "kick":
      return kick(client.client, commandArg);
    case "mute":
      return mute(client.client, commandArg);
    default:
      return;
  }
}
