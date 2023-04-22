import dotenv from "dotenv";
import { Client, GatewayIntentBits, Events, ChannelType } from "discord.js";
import { build } from "./builders/commandlistbuilder.js";
import {handleCommands} from "./handlers/commandhandler.js";
dotenv.config();

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ] 
});

const commands = await build("commands", true);

client.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}`);
});
client.on(Events.MessageCreate, async msg => {
  if (msg.channel.type === ChannelType.GuildText) {
    handleCommands(msg, commands);
  }
});

client.login(process.env.TOKEN);
