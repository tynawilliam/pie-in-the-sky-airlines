import { findAllPaths } from "../routeFinder";
import { AdjacencyList } from "../types";

describe("routeFinder - findAllPaths", () => {
  it("finds no paths if adjacency list is empty", () => {
    const emptyAdj: AdjacencyList = {};
    const paths = findAllPaths(emptyAdj, "A", "B");
    expect(paths).toHaveLength(0);
  });

  it("finds direct path if available", () => {
    const adj: AdjacencyList = {
      A: [{ destination: "B", distance: 100, flightTime: 2 }],
    };
    const paths = findAllPaths(adj, "A", "B");
    expect(paths).toHaveLength(1);
    expect(paths[0].cities).toEqual(["A", "B"]);
  });

  it("avoids cycles", () => {
    const adj: AdjacencyList = {
      A: [{ destination: "B", distance: 100, flightTime: 1 }],
      B: [{ destination: "A", distance: 100, flightTime: 1 }],
    };
    const paths = findAllPaths(adj, "A", "B");
    expect(paths).toHaveLength(1);
    expect(paths[0].cities).toEqual(["A", "B"]);
  });

  it("finds multiple paths", () => {
    const adj: AdjacencyList = {
      A: [
        { destination: "B", distance: 10, flightTime: 1 },
        { destination: "C", distance: 20, flightTime: 1 },
      ],
      B: [{ destination: "C", distance: 5, flightTime: 0.5 }],
    };
    const paths = findAllPaths(adj, "A", "C");
    expect(paths).toHaveLength(2);

    const pathStrings = paths.map((p) => p.cities.join("-"));
    expect(pathStrings).toContain("A-B-C");
    expect(pathStrings).toContain("A-C");
  });
});
