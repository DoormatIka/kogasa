import { Message } from "discord.js";
import { Command } from "../types/command.js";
import { parsee } from "../lib/parsee.js";
import PB from "../lib/pb.js";
import Pocketbase, {ListResult} from "pocketbase";

export const command: Command = {
  data: { 
    name: "nsfwsetting",
    description: "Sets the NSFW filter. (Not working yet.)",
    usage: "nsfwsetting [--enablensfwfilter|--disablensfwfilter] [sexy_limit:number] [hentai_limit:number] [porn_limit:number]",
    devMode: true,
  },
  async execute (msg, channel, args, pb) {
    await msg.channel.sendTyping();
    const settings = parseOptionSettings(args);
    const record = await PB.fetchServerRecord(pb, channel.guild.id);
    if (record.items.length < 1) {
      await PB.addServer(pb, channel.guild.id, { nsfwfiltersettings: settings });
      await msg.reply(`Added default settings on Guild #${channel.guild.id}.`);
    } else {
      if (await argumentValidator(msg, args, pb, record)) {
        return;
      }
      await PB.setSettings(pb, record, { nsfwfiltersettings: settings });
      await msg.reply(`Set ${JSON.stringify(settings)} on Guild #${channel.guild.id}`);
    } 
  },
};

async function argumentValidator (
  msg: Message, 
  args: string[],
  pb: Pocketbase,
  server: ListResult
) {
  if (args.length < 1) {
    const settings = await PB.getSettings(pb, server);
    await msg.reply(`NSFW Filter: ${settings.enablensfwfilter ? "enabled" : "disabled"}\nHentai Limit: ${settings.hentai_limit}\nPorn Limit: ${settings.porn_limit}\nSexy Limit: ${settings.sexy_limit}`);
    return true;
  }
}

export function parseOptionSettings (args: string[]) {
  const parsed = parsee(args);
  const sexy_limit = parsed.options.get("sexy_limit");
  const hentai_limit = parsed.options.get("hentai_limit");
  const porn_limit = parsed.options.get("porn_limit");
  const enablensfwfilter = parsed.booleans.some((str) => str === "--enablensfwfilter");
  const disablensfwfilter = parsed.booleans.some((str) => str === "--disablensfwfilter");

  return {
    enablensfwfilter: enablensfwfilter ?? disablensfwfilter,
    sexy_limit: sexy_limit ? parseInt(sexy_limit, 10) : undefined,
    hentai_limit: hentai_limit ? parseInt(hentai_limit, 10) : undefined,
    porn_limit: porn_limit ? parseInt(porn_limit, 10) : undefined,
  };
}
