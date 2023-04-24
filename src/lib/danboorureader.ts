import { parse } from "csv-parse";
import fs from "fs";

const parser = parse();

parser.on("error", function (err) {
  console.error(err.message);
});
parser.on("end", function () {
  console.log("Done.");
});

export function readDanbooruTags () {
  const record: Array<string> = [];
  return new Promise<Array<string>>((res, rej) => {
    fs.createReadStream("./data/danbooru.csv")
      .pipe(parser)
      .addListener("data", (chunk: Array<string>) => record.push(chunk[0]))
      .addListener("close", () => res(record))
      .addListener("error", (err) => rej(err));
  });
}
