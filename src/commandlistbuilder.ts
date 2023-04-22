import fs from "fs";
import path from "path";
import { Collection } from "discord.js";
import { Command, FileCommand } from "./types/command.js";
import { fileURLToPath, pathToFileURL } from "url";

/**
 * Gets every commands inside the selected directory folder.
 * @param directory - the directory of your command folder
 */
export async function build (directory: string, log?: boolean) {
  const commands = new Collection<string, Command>();
  const commandFiles = fs.readdirSync(path.resolve(`./src/${directory}`));

  for (const files of commandFiles) {
    const filePath = `./commands/${files}`;
    const command: FileCommand = await import(filePath);
    if (log) {
      console.log(`[INFO] Importing ./commands/${files}`);
    }
    setProperties(commands, command.command, filePath);
  }
  return commands;
}


function setProperties (
  commands: Collection<string, Command>, 
  command: Command, 
  filePath: string
) {
  if ("data" in command && "execute" in command) {
    commands.set(command.data.name, command);
  } else {
    console.log(`[WARN] command at ${filePath} is missing properties.`);
  }
}


