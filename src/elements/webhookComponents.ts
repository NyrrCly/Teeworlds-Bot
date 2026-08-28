import ComponentsBuilder from "../shared/builders/ComponentsBuilder.js";
import { bold } from "discord.js";
import { COLORS } from "../shared/constants/colors.js";

export function loginCode(code: string) {
  return new ComponentsBuilder()
    .setColor(COLORS.INFO)
    .addTitle("Login Code")
    .addSeparator()
    .addText(bold(code));
}

export function log(commandName: string, commandArg: string, author: string) {
  return new ComponentsBuilder()
    .setColor(COLORS.INFO)
    .addTitle(author)
    .addSeparator()
    .addText(`${bold(commandName)} ${bold(commandArg || "-")}`);
}
