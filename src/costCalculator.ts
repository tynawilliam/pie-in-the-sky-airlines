/**
 * utility functions to calulate costts of flights (legs and entire paths)
 */

export function calulateLegCost(distance: number, flightTime: number): number {
  const rawCost = distance * 15 + flightTime * 30;
  return parseFloat(rawCost.toFixed(2)); // round to 2 decimal places
}
