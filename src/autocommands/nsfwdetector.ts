import {AutoCommand} from "../types/auto.js";
import axios from "axios";
import tf from "@tensorflow/tfjs";
import nsfw from "nsfwjs";

export const auto: AutoCommand = {
  name: "nsfw",
  description: "Filters NSFW!",
  async execute (msg) {
    if (msg.author.id === "509683395224141827") {
      console.log("Hi.");
    }
  },
};
