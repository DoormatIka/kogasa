import booru from "booru";
import {Message, TextChannel} from "discord.js";
import {readDanbooruTags} from "../lib/fuzzy.js";
import {Command} from "../types/command.js";
import fuzzyset from "fuzzyset";

const tags = await readDanbooruTags();
const fzs = fuzzyset(tags, true, 2, 3);

export const command: Command = {
  data: {
    name: "dansearch",
    description: "Searches danbooru for images.",
    usage: "dansearch --autotag [tags]"
  },
  async execute (msg, channel, args) {
    await channel.sendTyping();
    if (checker(msg, channel)) return;
    if (args.find((v) => v === "--autotag")) {
      onAutoTag(msg, args);
      return;
    }
    collectSearchBooru(msg, args);
  },
};

// autoTag 
async function onAutoTag (msg: Message, args: string[]) {
  args.shift(); // removes --autotag
  await msg.reply(`Tags: ${ args.map(v => fzs.get(v, undefined, 0.6)?.at(0)?.at(1)).join("\n") }`);
}

async function collectSearchBooru (msg: Message, args: string[]) { 
  const posts = await booru.search("danbooru", args, { limit: 5, random: true });
  await msg.reply(`Collected: ${posts.map(c => c.sampleUrl).join("\n")}`);
}

function checker (msg: Message, channel: TextChannel): boolean { 
  if (!channel.nsfw) {
    msg.reply("Can't send you lewd photos in a non-nsfw channel.");
    return true;
  }
  return false;
}
