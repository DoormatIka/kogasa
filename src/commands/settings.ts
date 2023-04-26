import { Command } from "../types/command.js";

export const command: Command = {
  data: { 
    name: "nsfwsetting",
    description: "Sets the NSFW filter. (Not working yet.)",
    usage: "nsfwsetting [--enablensfw|--disablensfw] [sexy_limit:number] [hentai_limit:number] [porn_limit:number]",
    devMode: false,
  },
  async execute (msg) {
    await msg.channel.sendTyping();
    setTimeout(() => msg.channel.send("It's kinda working."), 1000);
  },
};

const discordCommand = "??setting --enablensfw sexy_limit:5 hentai_limit:5";

const parsed = parsee(discordCommand);

for (const optionMatch of parsed.optionMatches) {
  const option = optionMatch[0];
  const param = optionMatch[1];

}

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
