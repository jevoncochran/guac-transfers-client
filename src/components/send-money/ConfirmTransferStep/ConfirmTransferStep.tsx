import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import masterCard from "../../../assets/mastercard.svg";

import ConfirmationSection from "./ConfirmationSection";
import ConfirmationOptionCard from "./ConfirmationOptionCard";
import { TransferStep } from "../../../types";

const paymentCard = (
  <Box display="flex" alignItems="center">
    <img
      src={masterCard}
      className="option-card-start-adornment"
      alt=""
      height={20}
      style={{ marginRight: "8px" }}
    />
    <Typography variant="finePrintImportant" marginRight="8px">
      Debit
    </Typography>
    <Typography variant="finePrintImportant">{`•••• •••• •••• 2935`}</Typography>
  </Box>
);

const ConfirmTransferStep = () => {
  return (
    <div>
      <Typography variant="transferStepHeading" marginBottom="32px">
        Confirm and Send
      </Typography>

      <ConfirmationSection label="Amount & Delivery">
        <>
          <ConfirmationOptionCard
            confirmationItems={[
              { label: "Amount Converted", line1: "$97.01" },
              { label: "Transfer Fee", line1: "$2.99" },
              { label: "Total Cost", line1: "$100.00" },
              { label: "Total to Recipient", line1: "COL$378,600.00" },
            ]}
            step={TransferStep.SelectAmount}
          />
          <ConfirmationOptionCard
            confirmationItems={[{ label: "Delivery Speed", line1: "Express" }]}
            step={TransferStep.SelectAmount}
          />
          <ConfirmationOptionCard
            confirmationItems={[
              { label: "Delivery Method", line1: "Cash Pickup" },
            ]}
            step={TransferStep.SelectDeliveryMethod}
          />
          <ConfirmationOptionCard
            confirmationItems={[
              {
                label: "Cash Pickup Location(s)",
                line1: "Éxito, Carulla, Super Inter",
              },
            ]}
            step={TransferStep.SelectInstitution}
          />
        </>
      </ConfirmationSection>

      <ConfirmationSection label="Payment Details">
        <ConfirmationOptionCard
          confirmationItems={[
            { label: "Payment Method", line1: paymentCard },
            {
              label: "Billing Address",
              line1: "5542 Foothill Blvd",
              line2: "Oakland, CA 94605",
            },
          ]}
          step={TransferStep.SelectPaymentMethod}
        />
      </ConfirmationSection>

      <ConfirmationSection label="Recipient Details">
        <>
          <ConfirmationOptionCard
            confirmationItems={[
              { label: "Name", line1: "Jair Stiven Asprilla" },
            ]}
            step={TransferStep.SelectRecipient}
          />
          <ConfirmationOptionCard
            confirmationItems={[
              {
                label: "Address",
                line1: "Cra 2 #24-54",
                line2: "Quibdó, Chocó",
              },
            ]}
            step={TransferStep.EnterRecipientAddress}
          />
          <ConfirmationOptionCard
            confirmationItems={[
              {
                label: "Phone Number",
                line1: "+57 312 5873006",
              },
            ]}
            step={TransferStep.EnterRecipientPhoneNumber}
          />
        </>
      </ConfirmationSection>

      <ConfirmationSection label="Sender Details">
        <>
          <ConfirmationOptionCard
            confirmationItems={[{ label: "Name", line1: "Jevon Cochran" }]}
            canEdit={false}
          />
          <ConfirmationOptionCard
            confirmationItems={[
              {
                label: "Address",
                line1: "5542 Foothill Blvd",
                line2: "Oakland, CA 94605",
              },
            ]}
            canEdit={false}
          />
          <ConfirmationOptionCard
            confirmationItems={[
              {
                label: "Phone Number",
                line1: "+1 510 4248976",
              },
            ]}
            canEdit={false}
          />
        </>
      </ConfirmationSection>
    </div>
  );
};

export default ConfirmTransferStep;
