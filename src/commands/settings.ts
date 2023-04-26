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
  const optionMatches = [];
  const booleanMatches: string[] = [];
  for (let index = 0; index < parsed.length; index++) {
    const parse = parsed[index]; 
    const booleanMatch = parse.match("--");
    if (!booleanMatch) {
      optionMatches.push(parse.split(":"));
      continue;
    }
    booleanMatches.push(parse);
  }

  return {
    booleanMatches, optionMatches
  };
}
