import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface Props {
  label: string;
  sublabel?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleClick: (value: any) => void;
  value: unknown;
  startAdornment?: string;
}

const OptionCard = ({
  label,
  sublabel,
  handleClick,
  value,
  startAdornment,
}: Props) => {
  return (
    <Box
      sx={{
        height: "68px",
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
        <Box display="flex" alignItems="center">
          {startAdornment && (
            <img
              src={startAdornment}
              className="option-card-start-adornment"
              alt=""
              height={20}
            />
          )}

          <Box marginLeft="12px">
            <Typography variant="cardLabel">{label}</Typography>
            {sublabel && (
              <Typography variant="cardSubLabel">{sublabel}</Typography>
            )}
          </Box>
        </Box>

        <NavigateNextIcon />
      </Box>
    </Box>
  );
};

export default OptionCard;
