import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import ConfirmationItem from "./ConfirmationItem";
import EditConfirmationSectionBtn from "./EditConfirmationSectionBtn";
import { TransferStep } from "../../../types";

interface ConfirmationItemObj {
  label: string;
  line1: string | JSX.Element;
  line2?: string;
}

interface Props {
  confirmationItems: ConfirmationItemObj[];
  canEdit?: boolean;
  step?: TransferStep;
}

const ConfirmationOptionCard = ({
  confirmationItems,
  canEdit = true,
  step,
}: Props) => {
  const theme = useTheme();

  return (
    <Box
      marginBottom="8px"
      paddingY="12px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        "&:not(:last-of-type)": {
          borderBottom: `3px solid ${theme.palette.primary.light}`,
        },
      }}
    >
      <Box>
        {confirmationItems.map((ci) => (
          <ConfirmationItem
            key={ci.label}
            label={ci.label}
            line1={ci.line1}
            line2={ci.line2}
          />
        ))}
      </Box>
      {canEdit && step && <EditConfirmationSectionBtn step={step} />}
    </Box>
  );
};

export default ConfirmationOptionCard;
