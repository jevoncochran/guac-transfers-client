const identifyMissingFields = (missingFieldError: string, field: string) => {
  if (missingFieldError && field === "") {
    return "This field is missing";
  } else {
    return "";
  }
};

export { identifyMissingFields };
