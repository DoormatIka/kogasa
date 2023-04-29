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
    const settings = parseNSFWSettings(args);
    const record = await PB.fetchServerRecord(pb, channel.guild.id);
    if (record.items.length < 1) {
      await PB.addServer(pb, channel.guild.id, settings);
      await msg.reply(`Added default settings on Guild #${channel.guild.id}.`);
    } else {
      if (await argumentValidator(msg, args, pb, record)) {
        return;
      }
      await PB.setSettings(pb, record, settings);
      await msg.reply(`Set ${JSON.stringify(settings.nsfwfiltersettings)} on Guild #${channel.guild.id}`);
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

export function parseNSFWSettings (args: string[]) {
  const { booleanMatches, optionMatches } = parsee(args);
  const enableFilter = parseNSFWSettingBooleans(booleanMatches);
  const sexy_limit = optionMatches.find(c => c[0] === "sexy_limit");
  const hentai_limit = optionMatches.find(c => c[0] === "hentai_limit");
  const porn_limit = optionMatches.find(c => c[0] === "porn_limit");
  
  let nsfwfiltersettings;
  if (sexy_limit || hentai_limit || porn_limit) {
    nsfwfiltersettings = {
      sexy_limit: sexy_limit ? parseInt(sexy_limit[1], 10) : undefined,
      hentai_limit: hentai_limit ? parseInt(hentai_limit[1], 10) : undefined,
      porn_limit: porn_limit ? parseInt(porn_limit[1], 10) : undefined,
      enablensfwfilter: enableFilter,
    };
  }

  return {
    nsfwfiltersettings: nsfwfiltersettings,
    errors: {
      nsfwfilter: isValidParameters(sexy_limit, hentai_limit, porn_limit)
    }
  };
}

export function parseNSFWSettingBooleans (booleanMatches: string[]) {
  const isFilterEnabled = booleanMatches.find(c => c === "--enablensfwfilter") ? true : undefined;
  const isFilterDisabled = booleanMatches.find(c => c === "--disablensfwfilter") ? false : undefined;
  return isFilterEnabled ?? isFilterDisabled;
}

// refractor
function isValidParameters (
  sexy_limit?: string[],
  hentai_limit?: string[], 
  porn_limit?: string[]
) {
  if (sexy_limit && parseInt(sexy_limit[1]) > 100) {
    return true;
  }
  if (hentai_limit && parseInt(hentai_limit[1]) > 100) {
    return true;
  }
  if (porn_limit && parseInt(porn_limit[1]) > 100) {
    return true;
  }
  return false;
}
