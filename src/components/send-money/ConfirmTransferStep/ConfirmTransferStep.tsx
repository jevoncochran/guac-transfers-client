import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import visa from "../../../assets/visa.svg";
import masterCard from "../../../assets/mastercard.svg";
import ConfirmationSection from "./ConfirmationSection";
import ConfirmationOptionCard from "./ConfirmationOptionCard";
import { TransferStep } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { getCurrencyCode } from "../../../utils/getCurrencyCode";
import ContinueButton from "../ContinueButton";
import axios from "axios";
import { goToNextTransferStep } from "../../../redux/features/transfer/transferSlice";
import { formatAmount } from "../../../utils/formatAmount";
import { useTranslation } from "react-i18next";
import { PHONE_PREFIXES } from "../../../constants";
import { removeSpaces } from "../../../utils/removeSpaces";
import { Card } from "../../../types";

const ConfirmTransferStep = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.auth.user);
  const transfer = useAppSelector((state: RootState) => state.transfer);

  const { t } = useTranslation();

  const userCurrencyCode = getCurrencyCode(user?.country?.code as string);
  const recipientCurrencyCode = getCurrencyCode(
    transfer.country?.code as string
  );

  const transferData = {
    sent: Date.now(),
    senderId: user?.id,
    senderCountry: user?.country?.code,
    paymentMethod: transfer.paymentMethod?.type,
    paymentMethodStripeId: transfer.paymentMethod?.method.stripeId,
    deliveryMethod: transfer.deliveryMethod,
    institutionId: transfer.institution?.id,
    institution: transfer.institution?.name,
    recipientId: transfer.recipient?.id,
    recipientFirstName: transfer.recipient?.name?.firstName,
    recipientLastName: transfer.recipient?.name?.lastName,
    transferCountry: transfer.country?.code,
    recipientPhoneIso: transfer.recipient?.phone?.iso ?? transfer.country?.code,
    recipientPhoneNum: `+${
      transfer.recipient?.phone?.prefix ??
      PHONE_PREFIXES[transfer.country?.code as string]
    } ${removeSpaces(transfer.recipient?.phone?.body as string)}`,
    recipientStreetAddress: transfer.recipient?.address?.streetAddress,
    recipientCity: transfer.recipient?.address?.city,
    recipientState: transfer.recipient?.address?.department,
    recipientAccountNumber: transfer.recipient?.account?.accountNumber,
    sendAmount: transfer.sendAmount,
    standardFee: transfer.standardFee ?? 0,
    thirdPartyCharge: transfer.thirdPartyCharge,
    receiveAmount: transfer.receiveAmount,
  };

  const handleSubmit = () => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/transfers/send`, transferData)
      .then(() => {
        dispatch(goToNextTransferStep());
      });
  };

  const PaymentCard = (
    <Box display="flex" alignItems="center">
      <img
        src={
          (transfer.paymentMethod?.method as Card).brand === "visa"
            ? visa
            : masterCard
        }
        className="option-card-start-adornment"
        alt=""
        height={20}
        style={{ marginRight: "8px" }}
      />
      <Typography
        variant="finePrintImportant"
        marginRight="8px"
        textTransform="capitalize"
      >
        {transfer.paymentMethod?.method.type === "debit"
          ? t(
              "sendMoney.confirmTransfer.section.payment.subsections.method.line1.debit"
            )
          : t(
              "sendMoney.confirmTransfer.section.payment.subsections.method.line1.credit"
            )}
      </Typography>
      <Typography variant="finePrintImportant">{`•••• •••• •••• ${transfer.paymentMethod?.method.last4}`}</Typography>
    </Box>
  );

  return (
    <div>
      <Typography variant="mainHeading" marginBottom="32px">
        {t("sendMoney.confirmTransfer.mainHeading")}
      </Typography>

      <ConfirmationSection
        label={t("sendMoney.confirmTransfer.section.amount.label")}
      >
        <>
          <ConfirmationOptionCard
            confirmationItems={[
              {
                label: t(
                  "sendMoney.confirmTransfer.section.amount.subsections.converted.label"
                ),
                line1: `${formatAmount(
                  (transfer.sendAmount ?? 0) - (transfer.standardFee ?? 0)
                )} ${userCurrencyCode}`,
              },
              {
                label: t(
                  "sendMoney.confirmTransfer.section.amount.subsections.fee.label"
                ),
                line1: `${transfer.standardFee ?? `0.00`} ${userCurrencyCode}`,
              },
              {
                label: t(
                  "sendMoney.confirmTransfer.section.amount.subsections.cost.label"
                ),
                line1: `${formatAmount(
                  (transfer.sendAmount ?? 0) + (transfer.standardFee ?? 0)
                )} ${userCurrencyCode}`,
              },
              {
                label: t(
                  "sendMoney.confirmTransfer.section.amount.subsections.toRecipient.label"
                ),
                line1: `${formatAmount(
                  transfer.receiveAmount
                )} ${recipientCurrencyCode}`,
              },
            ]}
            step={TransferStep.SelectAmount}
          />
          <ConfirmationOptionCard
            confirmationItems={[
              {
                label: t(
                  "sendMoney.confirmTransfer.section.amount.subsections.transferMethod.label"
                ),
                line1: `${
                  transfer.transferMethod === "card"
                    ? t(
                        "sendMoney.confirmTransfer.section.amount.subsections.transferMethod.line1.card"
                      )
                    : t(
                        "sendMoney.confirmTransfer.section.amount.subsections.transferMethod.line1.bankAccount"
                      )
                }`,
              },
            ]}
            step={TransferStep.SelectAmount}
          />
          <ConfirmationOptionCard
            confirmationItems={[
              {
                label: t(
                  "sendMoney.confirmTransfer.section.amount.subsections.deliveryMethod.label"
                ),
                line1: `${
                  transfer.deliveryMethod === "bankDeposit"
                    ? t(
                        "sendMoney.confirmTransfer.section.amount.subsections.deliveryMethod.line1.bank"
                      )
                    : t(
                        "sendMoney.confirmTransfer.section.amount.subsections.deliveryMethod.line1.cash"
                      )
                }`,
              },
            ]}
            step={TransferStep.SelectDeliveryMethod}
          />
          {transfer.deliveryMethod === "cashPickup" && (
            <ConfirmationOptionCard
              confirmationItems={[
                {
                  label: t(
                    "sendMoney.confirmTransfer.section.amount.subsections.cashPickup.label"
                  ),
                  line1: transfer.institution?.name as string,
                },
              ]}
              step={TransferStep.SelectInstitution}
            />
          )}
        </>
      </ConfirmationSection>

      <ConfirmationSection
        label={t("sendMoney.confirmTransfer.section.payment.label")}
      >
        <ConfirmationOptionCard
          confirmationItems={[
            {
              label: t(
                "sendMoney.confirmTransfer.section.payment.subsections.method.label"
              ),
              line1: PaymentCard,
            },
            {
              label: t(
                "sendMoney.confirmTransfer.section.payment.subsections.billingAddress.label"
              ),
              line1: "5542 Foothill Blvd",
              line2: "Oakland, CA 94605",
            },
          ]}
          step={TransferStep.SelectPaymentMethod}
        />
      </ConfirmationSection>

      <ConfirmationSection
        label={t("sendMoney.confirmTransfer.section.recipient.label")}
      >
        <>
          <ConfirmationOptionCard
            confirmationItems={[
              {
                label: t(
                  "sendMoney.confirmTransfer.section.recipient.subsections.name.label"
                ),
                line1: `${transfer.recipient?.name?.firstName} ${transfer.recipient?.name?.lastName}`,
              },
            ]}
            step={TransferStep.SelectRecipient}
          />
          {transfer.recipient?.address && (
            <ConfirmationOptionCard
              confirmationItems={[
                {
                  label: t(
                    "sendMoney.confirmTransfer.section.recipient.subsections.address.label"
                  ),
                  line1: transfer.recipient?.address?.streetAddress as string,
                  line2: `${transfer.recipient?.address?.city}, ${transfer.recipient?.address?.department}`,
                },
              ]}
              step={TransferStep.EnterRecipientAddress}
            />
          )}
          <ConfirmationOptionCard
            confirmationItems={[
              {
                label: t(
                  "sendMoney.confirmTransfer.section.recipient.subsections.phone.label"
                ),
                line1: `+${
                  transfer.recipient?.phone?.prefix?.replace("+", "") ??
                  PHONE_PREFIXES[transfer.country?.code as string]
                } ${removeSpaces(transfer.recipient?.phone?.body as string)}`,
              },
            ]}
            step={TransferStep.EnterRecipientPhoneNumber}
          />
        </>
      </ConfirmationSection>

      <ConfirmationSection
        label={t("sendMoney.confirmTransfer.section.sender.label")}
      >
        <>
          <ConfirmationOptionCard
            confirmationItems={[
              {
                label: t(
                  "sendMoney.confirmTransfer.section.sender.subsections.name.label"
                ),
                line1: `${user?.firstName} ${user?.lastName}`,
              },
            ]}
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
                label: t(
                  "sendMoney.confirmTransfer.section.sender.subsections.phone.label"
                ),
                line1: `+${user?.phone?.prefix?.replace(
                  "+",
                  ""
                )} ${removeSpaces(user?.phone?.body as string)}`,
              },
            ]}
            canEdit={false}
          />
        </>
      </ConfirmationSection>

      <ContinueButton
        text={t("sendMoney.confirmTransfer.continueButton")}
        continueAction={handleSubmit}
        isDefault={false}
      />
    </div>
  );
};

export default ConfirmTransferStep;
