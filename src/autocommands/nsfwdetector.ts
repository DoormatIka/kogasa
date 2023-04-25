import tf from "@tensorflow/tfjs";
import nsfw from "nsfwjs";
import fs from "fs";
import sharp from "sharp";

const img = await sharp(fs.readFileSync("./data/letty.jpg"))
  .resize({ width: 400 })
  .jpeg({ quality: 80 })
  .toBuffer({ resolveWithObject: true });

console.info(`Running on ${img.info.width}x${img.info.height}`);
const tensor = convertBufferToTensor(img.data, { x: img.info.width, y: img.info.height } );

const model = await nsfw.load();
const prediction = await model.classify(tensor);
tensor.dispose();
console.log(prediction);


function convertBufferToTensor (
  imageBuffer: Buffer, 
  resolution: { x: number, y: number }, 
  channels = 3 
) {
  const pixels = resolution.x * resolution.y;
  const img = new Int32Array((pixels) * channels);
  for (let i = 0; i < pixels; i++) {
    for (let c = 0; c < channels; ++c) {
      img[i * channels + c] = imageBuffer[i * 4 + c];
    }
  }
  return tf.tensor3d(img, [resolution.x, resolution.y, 3], "int32");
}

