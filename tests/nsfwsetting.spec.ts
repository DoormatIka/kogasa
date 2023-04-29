import assert from "assert";
import { describe } from "node:test";
import {parseNSFWSettings, parseNSFWSettingBooleans} from "../src/commands/nsfwsetting.js";
import { parsee } from "../src/lib/parsee.js";


const args = ["--enablensfwfilter", "sexy_limit:60", "", "hentai_limit:800"];

describe("NSFW Parsing", function () {
  testParsee();
  testParseNSFWSettings(args);
  testNSFWSettingBooleans();
});

function testParsee () {  
  describe("parsee", function () {
    it("should parse the string array into their own separate options", function () { 
      const parsed = parsee(args);
      assert.deepStrictEqual(parsed, {
        booleanMatches: ["--enablensfwfilter"],
        optionMatches: [["sexy_limit", "60"], ["hentai_limit", "800"]]
      });
    });
  });
}

function testParseNSFWSettings (args: string[]) { 
  describe("parseNSFWSettings", function () {
    it("should parse the nsfw_limit, sexy_limit, etc.. into their own parameters", function () {
      const parsed = parseNSFWSettings(args);
      assert.deepEqual(parsed, {
        nsfwfiltersettings: {
          enablensfwfilter: true,
          hentai_limit: 800,
          sexy_limit: 60,
          porn_limit: undefined,
        },
        errors: {
          nsfwfilter: true
        }
      });
    });
  });
}

function testNSFWSettingBooleans () {
  describe("parseNSFWSettingBooleans", function () {
    it("should return true for both --enablensfwfilter & --disablensfwfilter combined", function () {
      const booleans = parseNSFWSettingBooleans(["--enablensfwfilter", "--disablensfwfilter"]);
      assert.strictEqual(booleans, true);
    });
    it("should return false for --disablensfwfilter", function () {
      const booleans = parseNSFWSettingBooleans(["--disablensfwfilter"]);
      assert.strictEqual(booleans, false);
    });
    it("should return true for --enablensfwfilter", function () {
      const booleans = parseNSFWSettingBooleans(["--enablensfwfilter"]);
      assert.strictEqual(booleans, true);
    });
    it("should return undefined", function () {
      const booleans = parseNSFWSettingBooleans([]);
      assert.strictEqual(booleans, undefined);
    });
  });
}
