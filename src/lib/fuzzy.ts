import fuzzysort from "fuzzysort";
import { parse } from "csv-parse";
import fs from "fs";

const records = [];
const parser = parse();

parser.on("error", function (err) {
  console.error(err.message);
});
parser.on("readable", function () {
  let record;
  while ((record = parser.read()) !== null) {
    records.push(record);
  }
});
parser.on("end", function () {
  console.log("Done.");
});

// parser.write()
