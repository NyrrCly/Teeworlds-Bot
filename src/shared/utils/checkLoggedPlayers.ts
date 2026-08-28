import { Client } from "teeworlds";
import { checkPlayerNameInLeaveMessage } from "./checkMessage.js";
import { iMessage } from "../../types/types.js";

export function isPlayerInLoggedClients(client: Client, playerName: string) {
  return client.clients.logged.includes(playerName);
}

export function checkLoggedPlayers(message: iMessage, client: Client) {
  for (const playerName of client.clients.logged) {
    if (checkPlayerNameInLeaveMessage(message, playerName)) {
      const getPlayerIndex = client.clients.logged.findIndex(
        (name) => name === playerName,
      );
      client.clients.logged.splice(getPlayerIndex, 1);
    }
  }
}
