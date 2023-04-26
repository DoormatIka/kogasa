
/**
  * Parses settings.
  * 
  * @param cmd - discord command
  * @returns
  *   - booleanMatches => a string[] that has every enable options
  *   - optionMatches => a string[][] that has every option and their parameters
  */
export function parsee (args: string[]): { booleanMatches: string[], optionMatches: string[][] } {
  const optionMatches: string[][] = [];
  const booleanMatches: string[] = [];
  for (let index = 0; index < args.length; index++) {
    const parse = args[index];
    parseBooleanAndOption(parse, optionMatches, booleanMatches);
  }

  return {
    booleanMatches, optionMatches
  };
}

function parseBooleanAndOption (
  parse: string, 
  optionMatches: string[][], 
  booleanMatches: string[]
) { 
  const booleanMatch = parse.match("--");
  if (!booleanMatch) {
    const splittedOptionMatches = parse.split(":");
    if (splittedOptionMatches.length === 2) {
      optionMatches.push(splittedOptionMatches);
    }
    return;
  }
  booleanMatches.push(parse);
}
