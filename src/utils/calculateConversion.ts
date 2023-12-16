export const calculateConversion = (
  amount: number,
  rate: number,
  charge: number,
  reverse: boolean = false
) => {
  if (!reverse) {
    // Convert from send amount to receive amount
    // Get the gross conversion by multiplying send amount by exchange rate
    const grossConversion = amount * rate;
    const charges = grossConversion * charge;
    // Get the net conversion by subtracting third party charge from gross conversion
    const netConversion = grossConversion - charges;
    // Limit to 2 decimal places
    const netConversionTwoDecimals =
      Math.round((netConversion + Number.EPSILON) * 100) / 100;
    return netConversionTwoDecimals;
  } else {
    // Backwards convert from receive amount to send amount
    const netConversion = amount;
    // Get the gross conversion amount by mathematically removing the third party charge %
    const grossConversion = netConversion / (1 - charge);
    // Divide the gross conversion by the exchange rate
    const reverseConversion = grossConversion / rate;
    // Limit to 2 decimal places
    const reverseConversionTwoDecimals =
      Math.round((reverseConversion + Number.EPSILON) * 100) / 100;
    return reverseConversionTwoDecimals;
  }
};
