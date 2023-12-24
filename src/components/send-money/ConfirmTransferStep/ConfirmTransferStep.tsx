import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import visa from "../../../assets/visa.svg";
import masterCard from "../../../assets/mastercard.svg";
import ConfirmationSection from "./ConfirmationSection";
import ConfirmationOptionCard from "./ConfirmationOptionCard";
import { TransferStep } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { getCurrencyCode } from "../../../utils/getCurrencyCode";

const ConfirmTransferStep = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const transfer = useAppSelector((state: RootState) => state.transfer);

  const userCurrencyCode = getCurrencyCode(user?.country?.code as string);
  const recipientCurrencyCode = getCurrencyCode(
    transfer.country?.code as string
  );

  const PaymentCard = (
    <Box display="flex" alignItems="center">
      <img
        src={
          transfer.paymentMethod?.method.brand === "visa" ? visa : masterCard
        }
        className="option-card-start-adornment"
        alt=""
        height={20}
        style={{ marginRight: "8px" }}
      />
      <Typography variant="finePrintImportant" marginRight="8px">
        {transfer.paymentMethod?.method.type === "debit" ? "Debit" : "Credit"}
      </Typography>
      <Typography variant="finePrintImportant">{`•••• •••• •••• ${transfer.paymentMethod?.method.last4}`}</Typography>
    </Box>
  );

  return (
    <div>
      <Typography variant="transferStepHeading" marginBottom="32px">
        Confirm and Send
      </Typography>

      <ConfirmationSection label="Amount & Delivery">
        <>
          <ConfirmationOptionCard
            confirmationItems={[
              {
                label: "Amount Converted",
                line1: `${
                  (transfer.sendAmount ?? 0) - (transfer.standardFee ?? 0)
                } ${userCurrencyCode}`,
              },
              {
                label: "Transfer Fee",
                line1: `${transfer.standardFee ?? 0} ${recipientCurrencyCode}`,
              },
              {
                label: "Total Cost",
                line1: `${
                  (transfer.sendAmount ?? 0) + (transfer.standardFee ?? 0)
                } ${userCurrencyCode}`,
              },
              {
                label: "Total to Recipient",
                line1: `${transfer.receiveAmount} ${recipientCurrencyCode}`,
              },
            ]}
            step={TransferStep.SelectAmount}
          />
          <ConfirmationOptionCard
            confirmationItems={[
              {
                label: "Delivery Speed",
                line1: `${
                  transfer.transferMethod === "card" ? "Express" : "Economy"
                }`,
              },
            ]}
            step={TransferStep.SelectAmount}
          />
          <ConfirmationOptionCard
            confirmationItems={[
              {
                label: "Delivery Method",
                line1: `${
                  transfer.deliveryMethod === "bankDeposit"
                    ? "Bank Deposit"
                    : "Cash Pickup"
                }`,
              },
            ]}
            step={TransferStep.SelectDeliveryMethod}
          />
          <ConfirmationOptionCard
            confirmationItems={[
              {
                label: "Cash Pickup Location(s)",
                line1: transfer.institution?.name as string,
              },
            ]}
            step={TransferStep.SelectInstitution}
          />
        </>
      </ConfirmationSection>

      <ConfirmationSection label="Payment Details">
        <ConfirmationOptionCard
          confirmationItems={[
            { label: "Payment Method", line1: PaymentCard },
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
              {
                label: "Name",
                line1: `${transfer.recipient?.name?.firstName} ${transfer.recipient?.name?.lastName}`,
              },
            ]}
            step={TransferStep.SelectRecipient}
          />
          <ConfirmationOptionCard
            confirmationItems={[
              {
                label: "Address",
                line1: transfer.recipient?.address?.streetAddress as string,
                line2: `${transfer.recipient?.address?.city}, ${transfer.recipient?.address?.department}`,
              },
            ]}
            step={TransferStep.EnterRecipientAddress}
          />
          <ConfirmationOptionCard
            confirmationItems={[
              {
                label: "Phone Number",
                line1: transfer.recipient?.phone as string,
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
          {/* <ConfirmationOptionCard
            confirmationItems={[
              {
                label: "Address",
                line1: "5542 Foothill Blvd",
                line2: "Oakland, CA 94605",
              },
            ]}
            canEdit={false}
          /> */}
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
