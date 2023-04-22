import dotenv from "dotenv";
import { Client, GatewayIntentBits, Events, ChannelType } from "discord.js";
import { build } from "./builders/commandlistbuilder.js";
import { handleCommands } from "./handlers/commandhandler.js";
import { handleHelp } from "./handlers/help.js";
dotenv.config();

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ] 
});

console.time("Building commands");
const commands = await build("commands", true);
console.timeEnd("Building commands");

const helpCommands = commands.map((command) => {
  return { usage: command.data.usage, description: command.data.description };
});
const helpText = handleHelp(helpCommands);

client.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}`);
});
client.on(Events.MessageCreate, async msg => {
  if (msg.channel.type === ChannelType.GuildText) {
    if (msg.content.startsWith("??help")) {
      msg.reply(helpText);
      return;
    }
    handleCommands(msg, commands);
  }
});

client.login(process.env.TOKEN);
