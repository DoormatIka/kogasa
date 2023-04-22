import { Command } from "../types/command.js";

export const command: Command = {
  data: { name: "ping" },
  async execute () {
    console.log("Just deal with it..");
  },
};
