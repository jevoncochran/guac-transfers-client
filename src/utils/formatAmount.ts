const formatAmount = (amount: number | null) => {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  if (!amount) return "";

  return amount.toLocaleString("en", options);
};

export { formatAmount };
