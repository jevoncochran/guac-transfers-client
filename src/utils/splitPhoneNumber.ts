// Breaks phone number string into separate parts (i.e. prefix and body)
const splitPhoneNumber = (phoneNum: string) => {
  const phoneMinusPlusSymbol = removePlusSign(phoneNum);

  const prefix = phoneMinusPlusSymbol.split(" ")[0];
  const body = phoneMinusPlusSymbol.split(" ")[1];

  return { prefix, body };
};

const removePlusSign = (phoneNum: string) => {
  return phoneNum.replace(/\+/g, "");
};

export { splitPhoneNumber, removePlusSign };
