import {Message, TextChannel} from "discord.js";

export type Command = {
  data: {
    name: string,
    description: string,
    usage: string,
  },
  execute: (msg: Message, channel: TextChannel, args: Array<string>) => Promise<void>
}

export type FileCommand = {
  command: Command
}
