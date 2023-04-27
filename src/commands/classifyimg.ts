import { Message } from "discord.js";
import { Command } from "../types/command.js";
import tf from "@tensorflow/tfjs-node";
import nsfw from "nsfwjs";
import axios, {AxiosResponse} from "axios";
import sharp from "sharp";
import {fetchServerRecord, getSettings} from "../lib/pb.js";

const model = await nsfw.load();

export const command: Command = {
  data: { 
    name: "classifyimg",
    description: "Classifies an image if it's NSFW or not.",
    usage: "classifyimg {image}",
    devMode: true,
  },
  async execute (msg, channel, args, pb) {
    await msg.channel.sendTyping();
    const res = [];
    const server = await fetchServerRecord(pb, channel.guildId);
    if (server.items.length < 1) {
      await msg.reply("Please do a `??nsfwsetting` to use this feature.");
      return;
    }

    const settings = await getSettings(pb, server);
    if (msg.attachments.size >= 1) {
      res.push(...await attachmentClassifier(msg));
    }
    const ifExplicit = await comparePredictionsToLimit(
      res, settings.hentai_limit, settings.porn_limit,
      settings.sexy_limit
    );
    await msg.reply(`ifExplicit: ${ifExplicit} | Sent attachments: ${msg.attachments.size}`);
  },
};

async function comparePredictionsToLimit (
  imagePredictions: nsfw.predictionType[][],
  hentai_limit: number, porn_limit: number, sexy_limit: number
) {
  console.log(imagePredictions);
  for (const imagePrediction of imagePredictions) {
    const isHentaiAboveLimit = imagePrediction.some(p => p.className === "Hentai" && (p.probability > (hentai_limit / 100)));
    const isPornAboveLimit = imagePrediction.some(p => p.className === "Porn" && (p.probability > (porn_limit / 100)));
    const isSexyAboveLimit = imagePrediction.some(p => p.className === "Sexy" && (p.probability > (sexy_limit / 100)));
    if (isPornAboveLimit || isSexyAboveLimit || isHentaiAboveLimit) {
      return true;
    }
  }
  return false;
}

async function attachmentClassifier (msg: Message) {
  const axiosBuffers = await getAttachments(msg);
  return await handleAxiosResponseClassification(axiosBuffers);
}

function getAttachments (msg: Message) {
  const axiosPromises = [];
  for (const attachments of msg.attachments) {
    axiosPromises.push(axios(attachments[1].proxyURL, { responseType: "arraybuffer" }));
  }
  return Promise.all(axiosPromises);
}

function handleAxiosResponseClassification<T> (
  axiosBuffers: Array<AxiosResponse<Buffer, T>>,
) { 
  const classifyPromises = [];
  for (const res of axiosBuffers) {
    classifyPromises.push(handleImageClassification(res.data));
  }
  return Promise.all(classifyPromises);
}


async function handleImageClassification (
  image: Buffer, 
) {
  const resizedImage = sharp(image)
    .resize({ width: 800, fit: sharp.fit.inside })
    .jpeg({ quality: 80 });
  const processedImage = await resizedImage.toBuffer({ resolveWithObject: true });
  const tensors = tf.node.decodeImage(processedImage.data, 3);
  const res = await model.classify(tensors as any);
  tensors.dispose();
  return res;
}
