import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import InputGroup from "../InputGroup";
import {
  goToNextTransferStep,
  setRecipientAddress,
} from "../../redux/features/transfer/transferSlice";
import ContinueButton from "./ContinueButton";
import { useTranslation } from "react-i18next";
import { TRANSFER_COUNTRIES } from "../../constants";
import i18n from "../../i18n";

const EnterRecipientAddressStep = () => {
  const dispatch = useAppDispatch();

  const recipientAccount = useAppSelector(
    (state: RootState) => state.transfer.recipient?.account
  );
  const recipientAddress = useAppSelector(
    (state: RootState) => state.transfer.recipient?.address
  );
  const transferCountry = useAppSelector(
    (state: RootState) => state.transfer.country
  );

  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setRecipientAddress({
        ...recipientAddress,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <div>
      <Typography variant="mainHeading">
        {t("sendMoney.enterRecipientAddress.mainHeading")}
      </Typography>
      <Typography variant="subtitle1">
        {`${t("sendMoney.enterRecipientAddress.subtitle.substring1")} ${
          recipientAccount?.bank?.name
        } ${t(
          "sendMoney.enterRecipientAddress.subtitle.substring2"
        )} ${recipientAccount?.accountNumber?.slice(-4)}`}
      </Typography>

      <InputGroup
        inputName="streetAddress"
        label={t("sendMoney.enterRecipientAddress.inputs.streetAddress.label")}
        value={recipientAddress?.streetAddress ?? ""}
        placeholder={t(
          "sendMoney.enterRecipientAddress.inputs.streetAddress.placeholder"
        )}
        onChange={handleChange}
      />

      <InputGroup
        inputName="city"
        label={t("sendMoney.enterRecipientAddress.inputs.city.label")}
        value={recipientAddress?.city ?? ""}
        placeholder={t(
          "sendMoney.enterRecipientAddress.inputs.city.placeholder"
        )}
        onChange={handleChange}
      />

      {transferCountry?.code === "CO" ? (
        <Box sx={{ marginBottom: "16px" }}>
          <InputLabel>
            {
              TRANSFER_COUNTRIES.find(
                (country) => country.code === transferCountry.code
              )?.subdivisions?.type[i18n.language]
            }
          </InputLabel>
          <Select
            id="recipient-country-subdivision"
            value={recipientAddress?.department}
            name="department"
            onChange={(e) =>
              dispatch(
                setRecipientAddress({
                  ...recipientAddress,
                  department: e.target.value,
                })
              )
            }
            fullWidth
          >
            {TRANSFER_COUNTRIES.find(
              (country) => country.code === "CO"
            )?.subdivisions?.list?.map((sd) => (
              <MenuItem key={sd} value={sd}>
                {sd}
              </MenuItem>
            ))}
          </Select>
        </Box>
      ) : (
        <InputGroup
          inputName="department"
          label="Department"
          value={recipientAddress?.department ?? ""}
          placeholder="Please enter department of recipient"
          onChange={handleChange}
        />
      )}

      <ContinueButton continueAction={() => dispatch(goToNextTransferStep())} />
    </div>
  );
};

export default EnterRecipientAddressStep;
