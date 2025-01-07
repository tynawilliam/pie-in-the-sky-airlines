import { CommandParseResult } from "./types";

/**
 * Take a single line of input and extract the command name and params
 */

export function parseCommand(line: string): CommandParseResult | null {
  const firstSpaceIndex = line.indexOf(" ");
  if (firstSpaceIndex === -1) {
    //if no space is found we cant seperate command
    return null;
  }

  const commandName = line.substring(0, firstSpaceIndex).trim();
  const paramString = line.substring(firstSpaceIndex + 1).trim();

  if (!commandName) {
    return null;
  }

  //split by commas into params
  const params = paramString.split(",").map((p) => p.trim());

  //if user ended the with a trailing comma we might get an empty string in the array
  //For now let comman handler decide if that is malformed
  return { commandName, params };
}
