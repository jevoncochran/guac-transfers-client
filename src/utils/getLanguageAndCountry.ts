import { LANGUAGES, USER_COUNTRIES } from "../constants";

const getLanguageByCode = (code: string) => {
  return LANGUAGES.find((lang) => lang.code === code);
};

const getCountryByCode = (code: string) => {
  return USER_COUNTRIES.find((country) => country.code === code);
};

export { getLanguageByCode, getCountryByCode };
