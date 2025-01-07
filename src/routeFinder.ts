import { AdjacencyList, RoutePath } from "./types";
import { calculateLegCost } from "./costCalculator";

export function findAllPaths(
  adjacencyList: AdjacencyList,
  origin: string,
  destination: string
): RoutePath[] {
  const results: RoutePath[] = [];

  //depth first search (dfs) to recursively explore paths from currentCity to target
  function dfs(
    currentCity: string,
    target: string,
    path: string[],
    totalCost: number
  ) {
    // If we've reached the target, record the path in results
    if (currentCity === target) {
      results.push({
        cities: [...path],
        cost: parseFloat(totalCost.toFixed(2)),
      });
      return;
    }

    // If currentCity has no outgoing flights, stop exploring further
    if (!adjacencyList[currentCity]) {
      return;
    }

    for (const leg of adjacencyList[currentCity]) {
      const nextCity = leg.destination;
      if (!path.includes(nextCity)) {
        const legCost = calculateLegCost(leg.distance, leg.flightTime);
        dfs(nextCity, target, [...path, nextCity], totalCost + legCost);
      }
    }
  }

  // Initiate DFS from origin
  dfs(origin, destination, [origin], 0);

  return results;
}
