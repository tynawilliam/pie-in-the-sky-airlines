# Pie in the Sky Airlines Route Finder

## Overview

This repository contains a Typescript solution for the "Pie in the Sky Airlines" coding challenge. The main objective is to:

1. Read commands from stdin.
2. Process them (ADD/QUERY).
3. Print valid results to stdout.
4. Print MALFORMED commands to stderr.

All communication follows the specified format:

- `ADD origin,destination,mileage,flightTime`
- `QUERY origin,destination`
- Output commands: `EDGE`, `RESULT`, `PATH`, `MALFORMED`.

## Installation and Usage

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Build**:

   ```bash
   npm run build
   ```

3. **Run**:

   ```bash
   node dist/index.js < input.txt > actualOutput.txt 2> actualError.txt
   ```

4. **Compare with expected**:

   ```bash
   diff -q output.txt actualOutput.txt
   diff -q error.txt actualError.txt
   ```

If there's no output from diff -q, then the results match the expected output.

## Testing

**To run the test suite (unit tests for the cost calculator, flight store, route finder, etc.)**:

```bash
npm test
```

Note A coverage report will be generated.

## Design Notes

1. ## Flight Data Structure

We store all flights (edges) in an adjacency list, keyed by origin city. For example:

```typescript
{
  "A": [{ "destination": "B", "distance": 100, "flightTime": 1 }],
  "B": [{ "destination": "C", "distance": 200, "flightTime": 2 }]
}
```

- `A` has one flight to `B` (distance: 100, flight time: 1).
- `B` has one flight to `C` (distance: 200, flight time: 2).

---

## Route Finding

We perform a **Depth-First Search (DFS)** to enumerate all possible paths, satisfying the requirement to list every possible route. The algorithm:

- Recursively explores each path.
- Avoids cycles by ensuring no city is revisited in the same path.
- Tracks total cost and visited cities during the traversal.

---

## Cost Calculation

Costs are calculated as follows:

- For a single leg:  
  **`cost = mileage * 15 + flightTime * 30`**, rounded to two decimals.
- For an entire path:  
  **Sum the costs of all legs in the path**.

Example:

- A flight leg with 100 miles and 2 hours has a cost of:  
  **`cost = 100 * 15 + 2 * 30 = 1530.00`**.

---

## Error Handling

This program handles errors in a robust and user-friendly manner:

1. **Malformed Commands**:  
   Any malformed command is printed as `MALFORMED` followed by the original command name and parameters to `stderr`.

2. **No Available Path**:  
   A `QUERY` command with no available path is considered malformed per the instructions.

3. **Graceful Handling**:  
   Extra or missing parameters are flagged as malformed. For example:
   - Missing values in `ADD` (e.g., `ADD A,B,100,`) will generate a `MALFORMED ADD,A,B,100,` error.
   - Unrecognized commands (e.g., `UNKNOWN`) will generate `MALFORMED UNKNOWN,...`.

---

## Performance Considerations

Enumerating all paths can be expensive, especially if:

- The graph is large.
- There are many possible paths between cities.

We mitigate some performance concerns by:

- Tracking visited cities to avoid infinite loops.
- Using a modular approach, allowing future optimizations.

However, the complexity remains exponential for certain graphs. In real-world scenarios:

- If only shortest paths are needed, we would probably consider implementing Breadth-First Search or Dijkstra's Algorithm.
- For weighted graphs with frequent queries, caching or indexing may improve efficiency.

---

## Extensibility

This solution is designed to be modular and easy to extend:

1. **Flight Storage**:

   - The in-memory flight store can be replaced with a database or a service-based storage layer.

2. **Cost Logic**:

   - The cost calculation logic is in a dedicated module (costCalculator.ts). Changes to the formula (e.g. adding taxes, fuel costs, etc.) can be made in one place.

3. **Graph Algorithms**:
   - The route finding logic (routeFinder.ts) can be swapped with other traversal algorithms without affecting other parts of the system.

This modularity ensures the solution can adapt to new requirements with minimal disruption to existing code.

.
