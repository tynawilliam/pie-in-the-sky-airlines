import { AdjacencyList } from "./types";
/**
 * Manage flight edges in an in-memory adjacency list.
 * Allows adding/updating flights and retrieving entire structure
 */

export class FlightStore {
  private adjacencyList: AdjacencyList = {};

  addOrUpdateFlight(
    origin: string,
    destination: string,
    distance: number,
    flightTime: number
  ): void {
    if (!this.adjacencyList[origin]) {
      this.adjacencyList[origin] = [];
    }

    //check if leg already exists, if so update otherwise push new leg
    const existingLegIndex = this.adjacencyList[origin].findIndex(
      (leg) => leg.destination === destination
    );

    if (existingLegIndex >= 0) {
      this.adjacencyList[origin][existingLegIndex].distance = distance;
      this.adjacencyList[origin][existingLegIndex].flightTime = flightTime;
    } else {
      this.adjacencyList[origin].push({ destination, distance, flightTime });
    }
  }

  // Returns a reference to the entire adjacency list
  getAllFlights(): AdjacencyList {
    return this.adjacencyList;
  }
}
