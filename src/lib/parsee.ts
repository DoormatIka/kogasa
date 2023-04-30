
/**
  * Parses settings.
  * 
  * @param cmd - discord command
  * @returns
  *   - booleanMatches => a string[] that has every enable options
  *   - optionMatches => a Map that has every option and their parameters
  */
export function parsee (args: string[]) {
  const options = new Map<string, string>();
  const booleans: string[] = [];
  for (let index = 0; index < args.length; index++) {
    const parse = args[index];
    const boolean = processBoolean(parse);
    if (!boolean) {
      const option = processOption(parse);
      if (option) {
        options.set(option[0], option[1]);
      }
      continue;
    }
    booleans.push(parse);
  }
  return { options, booleans };
}

function processBoolean (parse: string) {
  return parse.match(/--\w+/);
}
function processOption (parse: string) {
  const splitOptions = parse.split(":");
  if (
    splitOptions.length === 2 &&
    splitOptions[0] !== "" &&
    splitOptions[1] !== ""
  ) {
    return splitOptions;
  }
}
