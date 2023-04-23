import {TextChannel} from "discord.js";
import {Message} from "discord.js";
import {AutoCommand} from "../types/auto.js";

export function handleAuto (
  msg: Message,
  channel: TextChannel,
  textCommands: Array<AutoCommand>,
  imageCommands: Array<AutoCommand>,
) {
  if (msg.attachments.size >= 1) {
    const image: Array<Promise<void>> = [];
    for (const imageCommand of imageCommands) {
      image.push(imageCommand.execute(msg, channel));
    }
    return Promise.all(image);
  }
  
  const text: Array<Promise<void>> = [];
  for (const textCommand of textCommands) {
    text.push(textCommand.execute(msg, channel));
  }
  return Promise.all(text);
}
