import { Command } from "../types/command.js";

export const command: Command = {
  data: { 
    name: "nsfwsetting",
    description: "Sets the NSFW filter. (Not working yet.)",
    usage: "nsfwsetting [--enablensfw|--disablensfw] [sexy_limit:number] [hentai_limit:number] [porn_limit:number]",
    devMode: true,
  },
  async execute (msg) {
    await msg.channel.sendTyping();
    await msg.reply(JSON.stringify(parsee(msg.content), undefined, 2));
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
function parsee (cmd: string): { booleanMatches: string[], optionMatches: string[][] } {
  const parsed = cmd.split(" ");
  parsed.shift();
  const optionMatches: string[][] = [];
  const booleanMatches: string[] = [];
  for (let index = 0; index < parsed.length; index++) {
    const parse = parsed[index];
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
