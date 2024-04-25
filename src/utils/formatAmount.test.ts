import { formatAmount } from "./formatAmount";

describe("formatAmount", () => {
  it("should always return number with 2 decimal places", () => {
    expect(formatAmount(99)).toBe("99.00");
    expect(formatAmount(99.99)).toBe("99.99");
    expect(formatAmount(99.9)).toBe("99.90");
    expect(formatAmount(250)).toBe("250.00");
    expect(formatAmount(249.99)).toBe("249.99");
    expect(formatAmount(249.9)).toBe("249.90");
  });
});
