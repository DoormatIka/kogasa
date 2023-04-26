import { Command } from "../types/command.js";
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
    const { booleanMatches, optionMatches } = parsee(args);
    const isFilterEnabled = booleanMatches.find(c => c === "--enablensfw");
    const sexy_limit = optionMatches.find(c => c[0] === "sexy_limit");
    const hentai_limit = optionMatches.find(c => c[0] === "hentai_limit");
    const porn_limit = optionMatches.find(c => c[0] === "porn_limit");
    const settings = {
      nsfwfiltersettings: {
        sexy_limit: sexy_limit ? parseInt(sexy_limit[0], 10) : undefined,
        hentai_limit: hentai_limit ? parseInt(hentai_limit[0], 10) : undefined,
        porn_limit: porn_limit ? parseInt(porn_limit[0], 10) : undefined,
        enablensfwfilter: isFilterEnabled ? true : false,
      }
    };
    const record = await PB.fetchServerRecord(pb, channel.guild.id);
    if (record.items.length < 1) {
      PB.addServer(pb, channel.guild.id, settings);
    } else {
      PB.setSettings(pb, record, settings);
    }
  },
};


/**
  * Parses settings.
  * 
  * @param cmd - discord command
  * @returns
  *   - booleanMatches => a string[] that has every enable options
  *   - optionMatches => a string[][] that has every option and their parameters
  */
function parsee (args: string[]): { booleanMatches: string[], optionMatches: string[][] } {
  const optionMatches: string[][] = [];
  const booleanMatches: string[] = [];
  for (let index = 0; index < args.length; index++) {
    const parse = args[index];
    parseBooleanAndOption(parse, optionMatches, booleanMatches);
  }

  return {
    booleanMatches, optionMatches
  };
}

function parseBooleanAndOption (
  parse: string, 
  optionMatches: string[][], 
  booleanMatches: string[]
) { 
  const booleanMatch = parse.match("--");
  if (!booleanMatch) {
    const splittedOptionMatches = parse.split(":");
    if (splittedOptionMatches.length === 2) {
      optionMatches.push(splittedOptionMatches);
    }
    return;
  }
  booleanMatches.push(parse);
}
