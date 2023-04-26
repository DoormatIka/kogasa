import dotenv from "dotenv";
import { Client, GatewayIntentBits, Events, ChannelType } from "discord.js";
import { build, setCommandItems } from "./builders/commandlistbuilder.js";
import { handleCommands } from "./handlers/commandhandler.js";
import { handleHelp } from "./handlers/help.js";
import {handleAuto} from "./handlers/autohandler.js";
import {FileCommand} from "./types/command.js";
import {FileAutoCommand} from "./types/auto.js";
import Pocketbase from "pocketbase";
dotenv.config();

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ] 
});

const pocketbase = new Pocketbase("http://127.0.0.1:8090");

const commands = setCommandItems(await build<FileCommand>("commands", true));
const autoTextCommands = (await build<FileAutoCommand>("autocommands", true))
  .map(v => v.auto);
const helpCommands = commands.map((command) => {
  const devmode = command.data.devMode ? " (Dev Only)" : "";
  return { usage: command.data.usage, description: `${command.data.description}${devmode}` };
});
const helpText = handleHelp(helpCommands);

client.once(Events.ClientReady, async c => {
  console.log(`Logged in as ${c.user.tag}`);
  /*
  const union_guild = c.guilds.cache.get("1093805905872687174")!;
  const union_no_mic = c.channels.cache.get("1093810998202343444")!;
  const res = [...(await union_guild.members.fetch())!.values()];
  
  setInterval(() => {
    const member = res[Math.floor(Math.random() * res.length)];
    if (union_no_mic.isTextBased()) {
      union_no_mic.send(`<@${member.id}> Take a fucking shower you stinky harlot.`);
    }
  }, 10000);
  */
});
client.on(Events.MessageCreate, async msg => {
  if (msg.channel.type === ChannelType.GuildText) {
    if (msg.content.startsWith("??help")) {
      msg.reply(helpText);
      return;
    }
    handleCommands(msg, commands, process.env.DEVID!, pocketbase);
    await handleAuto(msg, msg.channel, autoTextCommands, []);
  }
});

client.login(process.env.TOKEN);
