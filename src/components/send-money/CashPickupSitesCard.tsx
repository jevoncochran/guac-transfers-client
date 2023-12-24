import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Institution } from "../../types";
import { useAppDispatch } from "../../redux/hooks";
import {
  goToNextTransferStep,
  setInstitution,
} from "../../redux/features/transfer/transferSlice";

interface Props {
  sites: Institution[];
}

const CashPickupSitesCard = ({ sites }: Props) => {
  const dispatch = useAppDispatch();

  const onSelect = () => {
    dispatch(
      setInstitution({ id: 0, name: sites.map((site) => site.name).join(", ") })
    );
    dispatch(goToNextTransferStep());
  };

  return (
    <Box
      sx={{
        minHeight: "60px",
        border: "1px solid black",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        padding: "16px",
        "&:not(:last-of-type)": { marginBottom: "12px" },
        cursor: "pointer",
      }}
      onClick={onSelect}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Box>
          {sites?.map((site) => (
            <Typography
              key={site.id}
              sx={{ "&:not(:last-of-type)": { marginBottom: "12px" } }}
            >
              {site.name}
            </Typography>
          ))}
        </Box>

        <NavigateNextIcon />
      </Box>
    </Box>
  );
};

export default CashPickupSitesCard;
