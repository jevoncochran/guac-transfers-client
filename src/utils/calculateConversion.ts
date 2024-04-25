export const calculateConversion = (
  amount: number,
  rate: number,
  charge: number,
  standardFee: number,
  reverse: boolean = false
) => {
  if (!reverse) {
    // Get amount of send currency to convert to receive currency
    const toConvert = amount - standardFee;

    // Convert to send currency
    let converted = toConvert * rate;
    // Remove excess decimals
    converted = removeExcessDecimals(converted);

    // Get third party fee
    let charges = converted * charge;
    // Remove excess decimals
    charges = removeExcessDecimals(charges);

    // Get receive amount and then remove excess decimals
    let receiveAmount = converted - charges;
    receiveAmount = removeExcessDecimals(receiveAmount);

    return {
      sendAmount: amount,
      receiveAmount,
      thirdPartyCharge: charges,
    };
  } else {
    // Backwards convert from receive amount to send amount
    let converted = amount / (1 - charge);
    // Remove excess decimals
    converted = removeExcessDecimals(converted);

    // Get third party fee
    let charges = converted - amount;
    charges = removeExcessDecimals(charges);

    let sendAmountWithoutCharges = converted / rate;
    // Remove excess decimals
    sendAmountWithoutCharges = removeExcessDecimals(sendAmountWithoutCharges);

    // Tack on standard fee
    sendAmountWithoutCharges = sendAmountWithoutCharges + standardFee;

    return {
      sendAmount: sendAmountWithoutCharges,
      receiveAmount: amount,
      thirdPartyCharge: charges,
    };
  }
};

export const removeExcessDecimals = (figure: number) => {
  return Math.round((figure + Number.EPSILON) * 100) / 100;
};
