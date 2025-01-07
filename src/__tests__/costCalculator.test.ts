import { calculateLegCost } from "../costCalculator";

describe("calculateLegCost", () => {
  it("calculates cost correctly for typical values", () => {
    expect(calculateLegCost(200, 2)).toBe(3060);
  });

  it("rounds to two decimals", () => {
    const result = calculateLegCost(100.123, 1.4567);
    expect(result).toBeCloseTo(1545.55, 2);
  });
});
