import fs from "fs";
import path from "path";
import { Collection } from "discord.js";
import { Command, FileCommand } from "../types/command.js";

/**
 * Gets every commands inside the selected directory folder.
 * @param directory - the directory of your command folder
 */
export async function build (directory: string, log?: boolean) {
  const commandCollection = new Collection<string, Command>();
  const commandFiles = fs.readdirSync(path.resolve(`./src/${directory}`));
  
  const pendingCommands: Array<Promise<FileCommand>> = [];
  for (const files of commandFiles) { 
    const filePath = `../commands/${files}`;
    pendingCommands.push(import(filePath));
    if (log) {
      console.log(`[INFO] Importing ${filePath}`);
    }
  }
  const importedCommands = await Promise.all(pendingCommands);
  importedCommands.forEach(commands => 
    setProperties(commandCollection, commands.command, commands.command.data.name));

  return commandCollection;
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


