/** Contains interfaces and type definitions used throughout the porject */

export interface FlightLeg {
  destination: string;
  distance: number;
  flightTime: number;
}

export interface AdjacencyList {
  [origin: string]: FlightLeg[];
}

/**
 * CommandParseResult describes the parsed form of a single line from stdin.
 * e.g. { commandName: "ADD", params: ["San Jose", "Philadelphia", "74.1", "85.2"] }
 */
export interface CommandParseResult {
  commandName: string;
  params: string[];
}

/**
 * RoutePath describes a complete path from origin to destination
 * along with the total cost of the path.
 */

export interface RoutePath {
  cities: string[];
  cost: number;
}
