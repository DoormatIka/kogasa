import {ChannelType, Collection, Message} from "discord.js";
import {Command} from "../types/command.js";

export async function handleCommands (
  msg: Message,
  commands: Collection<string, Command>,
  devID: string
) {
  if (msg.content.startsWith("??")) {
    const arrayedMessage = msg.content
      .replace("??", "")
      .split(" ");
    const userCmmd: string | undefined = arrayedMessage.at(0);
    const selected = commands.get(userCmmd ?? "");

    arrayedMessage.shift();
    handleExecution(msg, selected, devID, arrayedMessage);
  }
}

async function handleExecution (
  msg: Message, 
  selected: Command | undefined,
  devID: string,
  arrayedMessage: string[],
) {
  if (selected && msg.channel.type === ChannelType.GuildText) { 
    if (selected.data.devMode) {
      if (msg.author.id !== devID) {
        await msg.reply("Sorry, this command is for the developer only.");
        return;
      }
    }
    await selected.execute(msg, msg.channel, arrayedMessage);
  }
}
