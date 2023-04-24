import fs from "fs";
import path from "path";
import { Collection } from "discord.js";
import { Command, FileCommand } from "../types/command.js";

/**
 * Gets every commands inside the selected directory folder.
 * @param directory - the directory of your command folder
 */
export async function build<T> (directory: string, log?: boolean) {
  const commandFiles = fs.readdirSync(path.resolve(`./src/${directory}`));
  
  const pendingCommands: Array<Promise<T>> = [];
  for (const files of commandFiles) { 
    const filePath = `../${directory}/${files}`;
    pendingCommands.push(import(filePath));
    if (log) {
      console.log(`[INFO] Importing ${filePath}`);
    }
  }
  const importedCommands = await Promise.all(pendingCommands);
  return importedCommands;
}

export function setCommandItems (importedCommands: FileCommand[]) {
  const commands = new Collection<string, Command>();
  for (const importedCommand of importedCommands) {
    if ("data" in importedCommand.command && "execute" in importedCommand.command) {
      commands.set(importedCommand.command.data.name, importedCommand.command);
    } else {
      console.log(`[WARN] command at ${importedCommand.command} is missing properties.`);
    }
  }
  return commands;
}
