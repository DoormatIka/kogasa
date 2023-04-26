import { Command } from "../types/command.js";

export const command: Command = {
  data: { 
    name: "ping",
    description: "Pings you, I promise!",
    usage: "ping [user]",
    devMode: false,
  },
  async execute (msg) {
    await msg.channel.sendTyping();
    setTimeout(() => msg.channel.send("Hello there."), 1000);
  },
};
