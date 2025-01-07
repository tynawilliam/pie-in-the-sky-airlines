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
