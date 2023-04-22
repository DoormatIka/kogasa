import {Collection, Message} from "discord.js";
import {Command} from "../types/command.js";

export async function handleCommands (
  msg: Message,
  commands: Collection<string, Command>
) {
  if (msg.content.startsWith("??")) {
    const arrayedMessage = msg.content
      .replace("??", "")
      .split(" ");
    const userCmmd: string | undefined = arrayedMessage.at(0);
    const selected = commands.get(userCmmd ?? "");

    if (selected) {
      await selected.execute(msg);
    }
  }
}
