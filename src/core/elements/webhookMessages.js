import {bold, ContainerBuilder} from "discord.js";
import {COLORS} from "./colors.js";

export default class WebhookMessages {
    static loginCode(generatedCode) {
        return new ContainerBuilder()
            .setAccentColor(COLORS.INFO)
            .addTextDisplayComponents((textDisplay) =>
                textDisplay.setContent(`### Login Code`)
            )
            .addSeparatorComponents((separator) => separator)
            .addTextDisplayComponents((textDisplay) =>
                textDisplay.setContent(`${bold(generatedCode)}`)
            )
    }

    static commandUsed(commandName, commandArg, author) {
        return new ContainerBuilder()
            .setAccentColor(COLORS.INFO)
            .addTextDisplayComponents((textDisplay) =>
                textDisplay.setContent(`### ${author}`)
            )
            .addSeparatorComponents((separator) => separator)
            .addTextDisplayComponents((textDisplay) =>
                textDisplay.setContent('### Used\n' +
                    `${bold(commandName)} ${bold(commandArg || "-")}`
                )
            )
    }
}