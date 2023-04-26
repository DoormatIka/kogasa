import {Message, TextChannel} from "discord.js";
import Pocketbase from "pocketbase";

export type Command = {
  data: {
    name: string,
    description: string,
    usage: string,
    devMode: boolean,
  },
  execute: (msg: Message, channel: TextChannel, args: Array<string>, pocketbase: Pocketbase) => Promise<void>
}

export type FileCommand = {
  command: Command
}
