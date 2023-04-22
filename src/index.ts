import dotenv from "dotenv";
import { Client, GatewayIntentBits, Events } from "discord.js";
import { build } from "./commandlistbuilder.js";
dotenv.config();

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ] 
});

const commands = await build("commands", true);

commands.get("ping")?.execute();
/*
client.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}`);
});
*/
// client.login(process.env.TOKEN);
