import {AutoCommand} from "../types/auto.js";

export const auto: AutoCommand = {
  name: "nsfw",
  description: "Filters NSFW!",
  async execute (msg) {
    if (msg.author.id === "509683395224141827") {
      msg.reply(msg.content);
    }
  },
};
