import { Command } from "../types/command.js";

export const command: Command = {
  data: { 
    name: "nsfwsetting",
    description: "Sets the NSFW filter. (Not working yet.)",
    usage: "setting [--enablensfw|--disablensfw] [sexy_limit:number] [hentai_limit:number] [porn_limit:number]"
  },
  async execute (msg) {
    await msg.channel.sendTyping();
    setTimeout(() => msg.channel.send("It's kinda working."), 1000);
  },
};

const discordCommand = "??setting --enablensfw sexy_limit:5 hentai_limit:5";

console.log(parsee(discordCommand));

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
