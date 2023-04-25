import {AutoCommand} from "../types/auto.js";
import axios from "axios";
import tf from "@tensorflow/tfjs";
import nsfw from "nsfwjs";
import fs from "fs";
import sharp from "sharp";


const pixels = 1756 * 2357;
const channels = 3;
const bufferImg = fs.readFileSync("./data/letty.jpg");

const img = new Int32Array(pixels * channels);
const model = await nsfw.load();


for (let i = 0; i < pixels; i++) {
  for (let c = 0; c < channels; ++c) {
    img[i * channels + c] = bufferImg[i * 4 + c];
  }
}

const tensor = tf.tensor3d(img, [1756, 2357, 3], "int32");
const prediction = await model.classify(tensor);
tensor.dispose();
console.log(prediction);

export const auto: AutoCommand = {
  name: "nsfw",
  description: "Filters NSFW!",
  async execute (msg) {
    if (msg.author.id === "509683395224141827") {
      console.log("Hi.");
    }
  },
};
