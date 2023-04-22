import {Message} from "discord.js";

export type Command = {
  data: {
    name: string,
    description: string,
    usage: string,
  },
  execute: (msg: Message) => Promise<void>
}

export type FileCommand = {
  command: Command
}
