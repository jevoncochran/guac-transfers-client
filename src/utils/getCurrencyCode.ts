import { CURRENCIES } from "../constants";

const getCurrencyCode = (countryCode: string) => {
  return CURRENCIES[countryCode].code;
};

export { getCurrencyCode };
