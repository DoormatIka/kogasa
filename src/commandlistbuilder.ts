import fs from "fs";
import path from "path";
import { Collection } from "discord.js";
/**
 * Gets every commands inside the selected directory folder.
 * @param directory - the directory of your command folder
 */
export function build (directory: string) {
  const commands = new Collection<string, Command>();
  const foldersPath = path.join(__dirname, directory);
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandPath = path.join(foldersPath, folder);
    const commandFiles = returnAllFilenamesfromFolder(commandPath);
    importAllFromCommandFiles(commands, commandFiles, commandPath);
  }
  return commands;
}

function returnAllFilenamesfromFolder (
  commandPath: string,
) {
  const commandFiles = fs
    .readdirSync(commandPath)
    .filter(file => file.endsWith(".ts"));

  return commandFiles;
}

// impure function loll
function importAllFromCommandFiles (
  commandCollection: Collection<string, Command>,
  commandFiles: string[],
  commandPath: string,
) {
  for (const folder of commandFiles) {
    const filePath = path.join(commandPath, folder);
    import(filePath)
      .then((command: Command) => {
        setProperties(commandCollection, command, filePath);
      });
  }
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


