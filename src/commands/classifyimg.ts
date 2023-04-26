import { Message } from "discord.js";
import { Command } from "../types/command.js";
import tf from "@tensorflow/tfjs-node";
import nsfw from "nsfwjs";
import axios, {AxiosResponse} from "axios";
import sharp from "sharp";

const model = await nsfw.load();

export const command: Command = {
  data: { 
    name: "classifyimg",
    description: "Classifies an image if it's NSFW or not.",
    usage: "classifyimg {image}",
    devMode: true,
  },
  async execute (msg) {
    await msg.channel.sendTyping();
    if (await checker(msg)) {
      return;
    }
    const res = [];
    if (msg.attachments.size >= 1) {
      res.push(...await attachmentClassifier(msg));
    }
    if (msg.embeds.length >= 1) {
      res.push(...await embedClassifier(msg));
    }
    await msg.reply(`Res: ${res.join("\n\n")} | Sent attachments: ${msg.attachments.size}`);
  },
};

async function checker (msg: Message): Promise<boolean> {
  if (msg.author.id !== "509683395224141827") {
    await msg.reply("This is still in development! Dev-only.");
    return true;
  }
  return false;
}

async function attachmentClassifier (msg: Message) {
  const axiosBuffers = await getAttachments(msg);
  const responses = await handleAxiosResponseClassification(axiosBuffers);
  return responses.flatMap((c, i) => {
    return `Attachment ${i}: ${c.map(c => `${c.className} => ${c.probability * 100}`).join("\n")}`;
  });
}

async function embedClassifier (msg: Message) {
  const axiosBuffers = await getEmbeds(msg);
  const responses = await handleAxiosResponseClassification(axiosBuffers);
  return responses.flatMap((c, i) => {
    return `Embed ${i}: ${c.map(c => `${c.className} => ${c.probability * 100}`).join("\n")}`;
  });
}

function getEmbeds (msg: Message) {
  const axiosPromises = [];
  for (const embed of msg.embeds) {
    if (embed.image) {
      if (embed.thumbnail) {
        axiosPromises.push(axios(embed.thumbnail.url, { responseType: "arraybuffer" }));
      }
    }
  }
  return Promise.all(axiosPromises);
}

function getAttachments (msg: Message) {
  const axiosPromises = [];
  for (const attachments of msg.attachments) {
    axiosPromises.push(axios(attachments[1].proxyURL, { responseType: "arraybuffer" }));
  }
  return Promise.all(axiosPromises);
}

function handleAxiosResponseClassification<T> (axiosBuffers: Array<AxiosResponse<Buffer, T>>) { 
  const classifyPromises = [];
  for (const res of axiosBuffers) {
    classifyPromises.push(handleImageClassification(res.data));
  }
  return Promise.all(classifyPromises);
}


async function handleImageClassification (image: Buffer) {
  const resizedImage = sharp(image)
    .resize({ width: 800, fit: sharp.fit.inside })
    .jpeg({ quality: 80 });
  const processedImage = await resizedImage.toBuffer({ resolveWithObject: true });
  const tensors = tf.node.decodeImage(processedImage.data, 3);
  const res = await model.classify(tensors as any);
  tensors.dispose();
  return res;
}
