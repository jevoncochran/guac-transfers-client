import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";

interface Props {
  label: string;
  children: JSX.Element;
}

const ConfirmationSection = ({ label, children }: Props) => {
  const theme = useTheme();

  return (
    <Box sx={{ "&:not(:last-of-type)": { marginBottom: "24px" } }}>
      <Box
        width="100%"
        paddingBottom="12px"
        borderBottom={`2px solid ${theme.palette.secondary.light}`}
      >
        <Typography variant="sectionLabel">{label}</Typography>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default ConfirmationSection;
