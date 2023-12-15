import Typography from "@mui/material/Typography";
import OptionCard from "./OptionCard";

const SelectDeliveryMethodStep = () => {
  return (
    <div>
      <Typography variant="h5" sx={{ marginBottom: "16px" }}>
        Delivery Method
      </Typography>
      <Typography variant="subtitle1">
        How would you like the money delivered?
      </Typography>

      <OptionCard label="Bank Deposit" />
      <OptionCard label="Cash Pickup" />
    </div>
  );
};

export default SelectDeliveryMethodStep;
