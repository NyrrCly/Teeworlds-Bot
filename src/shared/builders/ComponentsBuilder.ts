import { ContainerBuilder, heading } from "discord.js";
import type { RGBTuple } from "discord.js";

export default class ComponentsBuilder extends ContainerBuilder {
  setColor(color: RGBTuple) {
    return this.setAccentColor(color);
  }

  addTitle(text: string) {
    return this.addTextDisplayComponents((testDisplay) =>
      testDisplay.setContent(heading(text, 3)),
    );
  }

  addText(text: string) {
    return this.addTextDisplayComponents((testDisplay) =>
      testDisplay.setContent(text),
    );
  }

  addSeparator() {
    return this.addSeparatorComponents((separator) => separator);
  }
}