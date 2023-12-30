import { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TransferCard from "../components/transfer-history/TransferCard";

const TransferHistory = () => {
  const userId = useAppSelector((state: RootState) => state.auth.user?.id);

  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users/${userId}/transfer-history`)
      .then((res) => {
        console.log(res.data);
        setTransfers(res.data);
      });
  }, []);

  return (
    <div>
      <Typography
        variant="mainHeading"
        sx={{ marginBottom: "16px", textAlign: "center" }}
      >
        Your Transfers
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box>
          {transfers.map((t) => (
            <TransferCard key={t.id} transfer={t} />
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default TransferHistory;
