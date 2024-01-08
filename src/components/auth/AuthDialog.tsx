import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  handleClose: () => void;
  type: string | null;
}

const AuthDialog = ({ open, handleClose, type }: Props) => {
  const authDialog = useAppSelector((state: RootState) => state.ui.authDialog);

  const { t } = useTranslation();

  const getAuthDialog = (type: string | null) => {
    switch (type) {
      case "signUp":
        return { component: <SignUpForm />, label: "Create an account" };
      case "signIn":
        return { component: <LoginForm />, label: t("auth.login.label") };
      default:
        return { component: null, label: null };
    }
  };

  return authDialog.isOpen ? (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        variant: "dialog",
        style: {
          backgroundColor: "#fcfbe6",
          borderRadius: "16px",
          minWidth: type === "signIn" ? "500px" : "700px",
        },
      }}
    >
      <Box display={"flex"} justifyContent={"flex-end"}>
        <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
      </Box>
      <DialogTitle textAlign={"center"} sx={{ marginBottom: "12px" }}>
        {getAuthDialog(type).label}
      </DialogTitle>
      <DialogContent>{getAuthDialog(type)?.component}</DialogContent>
    </Dialog>
  ) : null;
};

export default AuthDialog;
