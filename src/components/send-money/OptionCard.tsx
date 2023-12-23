import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface Props {
  label: string;
  sublabel?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleClick: (value: any) => void;
  value: unknown;
}

const OptionCard = ({ label, sublabel, handleClick, value }: Props) => {
  return (
    <Box
      sx={{
        height: "60px",
        border: "1px solid black",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        paddingX: "16px",
        "&:not(:last-of-type)": { marginBottom: "12px" },
        cursor: "pointer",
      }}
      onClick={() => handleClick(value)}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Box>
          <Typography>{label}</Typography>
          {sublabel && <Typography>{sublabel}</Typography>}
        </Box>

        <NavigateNextIcon />
      </Box>
    </Box>
  );
};

export default OptionCard;
