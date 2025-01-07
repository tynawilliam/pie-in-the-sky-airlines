import * as readline from "readline";
import { parseCommand } from "./commandParser";
import { FlightStore } from "./flightStore";
import { findAllPaths } from "./routeFinder";

const flightStore = new FlightStore();

//setup readline interface from stdin
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

//on each line from stdin attempt to parse and execute it
rl.on("line", (line: string) => {
  const trimmedLine = line.trim();
  if (!trimmedLine) {
    return; //ignore empty lines
  }

  const parsed = parseCommand(trimmedLine);
  if (!parsed) {
    printMalformed(trimmedLine);
    return;
  }

  const { commandName, params } = parsed;

  switch (commandName) {
    case "ADD":
      handleAddCommand(params);
      break;
    case "QUERY":
      handleQueryCommand(params);
      break;
    default:
      // Command not recognized => MALFORMED
      printMalformed(trimmedLine);
      break;
  }
});

function handleAddCommand(params: string[]) {
  if (params.length !== 4) {
    printMalformed("ADD," + params.join(","));
    return;
  }

  const [origin, destination, distanceStr, flightTimeStr] = params;

  if (!origin || !destination || !distanceStr || !flightTimeStr) {
    printMalformed("ADD," + params.join(","));
    return;
  }

  // Convert distance/flightTime to numbers
  const distance = parseFloat(distanceStr);
  const flightTime = parseFloat(flightTimeStr);

  // extra validation for negative or NaN
  if (isNaN(distance) || distance < 0 || isNaN(flightTime) || flightTime < 0) {
    // Not specified if negative is allowed but let's assume it's invalid
    printMalformed("ADD," + params.join(","));
    return;
  }

  // Store/Update
  flightStore.addOrUpdateFlight(origin, destination, distance, flightTime);

  // Print successful EDGE command
  console.log(`EDGE ${origin},${destination},${distanceStr},${flightTimeStr}`);
}

function handleQueryCommand(params: string[]) {
  if (params.length !== 2) {
    printMalformed("QUERY," + params.join(","));
    return;
  }

  const [origin, destination] = params;

  if (!origin || !destination) {
    printMalformed("QUERY," + params.join(","));
    return;
  }

  // Find all possible paths
  const allPaths = findAllPaths(
    flightStore.getAllFlights(),
    origin,
    destination
  );

  //if no path exists => MALFORMED
  if (allPaths.length === 0) {
    printMalformed(`QUERY,${origin},${destination}`);
    return;
  }

  console.log(`RESULT ${origin},${destination}`);

  // Sort by ascending cost
  allPaths.sort((a, b) => a.cost - b.cost);

  // Print each path
  for (const pathObj of allPaths) {
    const pathLine = `PATH ${pathObj.cost},${pathObj.cities.join(",")}`;
    console.log(pathLine);
  }
}

function printMalformed(line: string) {
  console.error(`MALFORMED ${line}`);
}
