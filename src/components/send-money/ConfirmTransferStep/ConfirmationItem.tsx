import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface Props {
  label: string;
  line1: string | JSX.Element;
  line2?: string;
}
const ConfirmationItem = ({ label, line1, line2 }: Props) => {
  return (
    <Box sx={{ "&:not(:last-of-type)": { marginBottom: "12px" } }}>
      <Typography variant="finePrint" marginBottom="4px">
        {label}
      </Typography>
      {typeof line1 === "string" ? (
        <Typography variant="finePrintImportant">{line1}</Typography>
      ) : (
        <>{line1}</>
      )}
      {line2 && <Typography variant="finePrintImportant">{line2}</Typography>}
    </Box>
  );
};

export default ConfirmationItem;
