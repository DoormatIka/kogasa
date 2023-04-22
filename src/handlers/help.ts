export function handleHelp (
  arrayedMessage: Array<{ description: string, usage: string }>,
) {   
  let format = "```\n";
  for (const help of arrayedMessage) {
    format += `??${help.usage} ==> ${help.description}\n`;
  }
  format += "```";
  return format;
}
