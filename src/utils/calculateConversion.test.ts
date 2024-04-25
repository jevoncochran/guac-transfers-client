import {
  calculateConversion,
  removeExcessDecimals,
} from "./calculateConversion";

describe("calculateConversion", () => {
  it("should correctly calculate convert from send to receive currency", () => {
    expect(calculateConversion(100, 4, 0.03, 3.99, false).sendAmount).toBe(100);
    expect(calculateConversion(100, 4, 0.03, 3.99, false).receiveAmount).toBe(
      372.52
    );
    expect(
      calculateConversion(100, 4, 0.03, 3.99, false).thirdPartyCharge
    ).toBe(11.52);
  });
});

describe("calculateConversionInReverse", () => {
  it("should correctly calculate conversion from receive currency to send currency", () => {
    expect(calculateConversion(400, 4, 0.03, 3.99, true).sendAmount).toBe(
      107.08
    );
    expect(calculateConversion(400, 4, 0.03, 3.99, true).receiveAmount).toBe(
      400
    );
    expect(calculateConversion(400, 4, 0.03, 3.99, true).thirdPartyCharge).toBe(
      12.37
    );
  });
});

describe("removeExcessDecimals", () => {
  it("should return the integer rounded (at most) to 2 decimal places", () => {
    expect(removeExcessDecimals(99.99999)).toBe(100);
    expect(removeExcessDecimals(99.994)).toBe(99.99);
  });
});
