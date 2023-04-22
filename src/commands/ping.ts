import { Command } from "../types/command.js";

export const command: Command = {
  data: { name: "ping" },
  async execute (msg) {
    await msg.channel.sendTyping();
    setTimeout(() => msg.channel.send("Hello there."), 1000);
  },
};
