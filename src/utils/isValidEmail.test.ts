import { isValidEmail } from "./isValidEmail";

describe("isValidEmail", () => {
  it("validates if value of email input is in valid email format", () => {
    expect(isValidEmail("jevon")).toBe(false);
    expect(isValidEmail("jevon.cochran")).toBe(false);
    expect(isValidEmail("jevon.cochran@gmail")).toBe(false);
    expect(isValidEmail("jevon.cochran@gmail.com")).toBe(true);
  });
});
