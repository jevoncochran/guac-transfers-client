import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

const useFormatAmount = () => {
  const languageCode = useAppSelector(
    (state: RootState) => state.auth.user?.language?.code
  );

  const formatAmount = (amount: number | null) => {
    const options = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    if (!amount) return "";

    return amount.toLocaleString(languageCode, options);
  };

  return { formatAmount };
};

export default useFormatAmount;
