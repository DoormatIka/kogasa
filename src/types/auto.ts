import {Message, TextChannel} from "discord.js";

export type AutoCommand = {
  name: string,
  description: string,
  execute: (msg: Message, channel: TextChannel) => Promise<void>
}

export type FileAutoCommand = {
  auto: AutoCommand
}
