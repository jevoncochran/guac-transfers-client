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
    // Get the net conversion by subtracting third party charge % from gross conversion
    const netConversion = grossConversion - grossConversion * charge;
    return netConversion;
  } else {
    // Backwards convert from receive amount to send amount
    const netConversion = amount;
    // Get the gross conversion amount by mathematically removing the third party charge %
    const grossConversion = netConversion / (1 - charge);
    // Divide the gross conversion by the exchange rate
    return grossConversion / rate;
  }
};
