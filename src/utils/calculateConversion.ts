export const calculateConversion = (
  amount: number,
  rate: number,
  charge: number,
  standardFee: number,
  reverse: boolean = false
) => {
  if (!reverse) {
    // Get third party fee
    let charges = amount * charge;
    // Remove excess decimals
    charges = removeExcessDecimals(charges);

    // Get amount of send currency to convert to receive currency
    const toConvert = amount - charges - standardFee;

    // Convert to send currency
    let converted = toConvert * rate;
    // Remove excess decimals
    converted = removeExcessDecimals(converted);

    return {
      sendAmount: amount,
      receiveAmount: converted,
      thirdPartyCharge: charges,
    };
  } else {
    // Backwards convert from receive amount to send amount

    let converted = amount / rate;
    // Remove excess decimals
    converted = removeExcessDecimals(converted);

    let sendAmountWithoutCharges = converted / (1 - charge);
    // Remove excess decimals
    sendAmountWithoutCharges = removeExcessDecimals(sendAmountWithoutCharges);

    // Get third party fee
    const charges = sendAmountWithoutCharges - converted;

    // Tack on standard fee
    sendAmountWithoutCharges = sendAmountWithoutCharges + standardFee;

    return {
      sendAmount: sendAmountWithoutCharges,
      receiveAmount: amount,
      thirdPartyCharge: charges,
    };
  }
};

const removeExcessDecimals = (figure: number) => {
  return Math.round((figure + Number.EPSILON) * 100) / 100;
};
