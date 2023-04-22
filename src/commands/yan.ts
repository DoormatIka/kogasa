import booru from "booru";
import {Command} from "../types/command.js";

export const command: Command = {
  data: {
    name: "yansearch",
    description: "Searches yande.re for images.",
    usage: "yansearch [tags]"
  },
  async execute (msg, channel, args) {
    await channel.sendTyping();
    if (!channel.nsfw) {
      msg.reply("Can't send you lewd photos in a non-nsfw channel.");
      return;
    }
    if (args.length < 2) {
      msg.reply("The numbers of tags you typed in are not more than two.");
      return;
    }
    const posts = await booru.search("yande.re", args, { limit: 5 });
    await msg.reply(`Collected: ${posts.map(c => c.sampleUrl).join("\n")}`);
  },
};
