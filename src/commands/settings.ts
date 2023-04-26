import { Command } from "../types/command.js";
import { parsee } from "../lib/parsee.js";
import PB from "../lib/pb.js";

export const command: Command = {
  data: { 
    name: "nsfwsetting",
    description: "Sets the NSFW filter. (Not working yet.)",
    usage: "nsfwsetting [--enablensfw|--disablensfw] [sexy_limit:number] [hentai_limit:number] [porn_limit:number]",
    devMode: true,
  },
  async execute (msg, channel, args, pb) {
    await msg.channel.sendTyping();
    const settings = parseCommands(args);
    const record = await PB.fetchServerRecord(pb, channel.guild.id);
    if (record.items.length < 1) {
      await PB.addServer(pb, channel.guild.id, settings);
      await msg.reply(`Added ${settings.nsfwfiltersettings} on ${channel.guild.id}`);
    } else {
      await PB.setSettings(pb, record, settings);
      await msg.reply(`Set ${settings.nsfwfiltersettings} on ${channel.guild.id}`);
    }
  },
};

function parseCommands (args: string[]) { 
  const { booleanMatches, optionMatches } = parsee(args);
  const isFilterEnabled = booleanMatches.find(c => c === "--enablensfw");
  const sexy_limit = optionMatches.find(c => c[0] === "sexy_limit");
  const hentai_limit = optionMatches.find(c => c[0] === "hentai_limit");
  const porn_limit = optionMatches.find(c => c[0] === "porn_limit");
  return {
    nsfwfiltersettings: {
      sexy_limit: sexy_limit ? parseInt(sexy_limit[0], 10) : undefined,
      hentai_limit: hentai_limit ? parseInt(hentai_limit[0], 10) : undefined,
      porn_limit: porn_limit ? parseInt(porn_limit[0], 10) : undefined,
      enablensfwfilter: isFilterEnabled ? true : false,
    }
  };
}
