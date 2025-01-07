import { FlightStore } from "../flightStore";

describe("FlightStore", () => {
  let store: FlightStore;

  beforeEach(() => {
    store = new FlightStore();
  });

  it("adds a new flight", () => {
    store.addOrUpdateFlight("A", "B", 100, 2);
    const flights = store.getAllFlights();
    expect(flights["A"]).toHaveLength(1);
    expect(flights["A"][0]).toEqual({
      destination: "B",
      distance: 100,
      flightTime: 2,
    });
  });

  it("updates an existing flight", () => {
    store.addOrUpdateFlight("A", "B", 100, 2);
    store.addOrUpdateFlight("A", "B", 150, 3);
    const flights = store.getAllFlights();
    expect(flights["A"]).toHaveLength(1);
    expect(flights["A"][0]).toEqual({
      destination: "B",
      distance: 150,
      flightTime: 3,
    });
  });
});
