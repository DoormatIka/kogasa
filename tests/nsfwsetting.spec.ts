import assert from "assert";
import { describe } from "node:test";
import {parseOptionSettings} from "../src/commands/nsfwsetting.js";
import { parsee } from "../src/lib/parsee.js";

describe("NSFW Parsing", function () {
  testParsee();
  nsfwSettingParser();
});

function testParsee () {  
  describe("parsee", function () {
    it("should parse the string array into their own separate options", function () { 
      const args = ["--enable", "angelic:phase", "aa:", "--", ":a", "aaaa"];
      const parsed = parsee(args);
      const predictedOptions = new Map();
      predictedOptions.set("angelic", "phase");
      assert.deepStrictEqual(parsed, {
        options: predictedOptions,
        booleans: ["--enable"]
      });
    });
  });
}

function nsfwSettingParser () {
  describe("nsfw setting parser", function () {
    it("should have limit params and boolean | Normal", function () {
      const args = ["--enablensfwfilter", "--disablensfwfilter", "sexy_limit:0", "hentai_limit:0"];
      const parsed = parseOptionSettings(args);
      assert.deepStrictEqual(parsed, {
        enablensfwfilter: true,
        sexy_limit: 0,
        hentai_limit: 0,
        porn_limit: undefined,
      });
    });
  });
}
