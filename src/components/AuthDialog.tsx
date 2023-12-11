import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

interface Props {
  open: boolean;
  handleClose: () => void;
  type: string | null;
}

const AuthDialog = ({ open, handleClose, type }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        variant: "dialog",
        style: { backgroundColor: "#fcfbe6", borderRadius: "16px" },
      }}
    >
      <Box display={"flex"} justifyContent={"flex-end"}>
        <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
      </Box>
      <DialogTitle textAlign={"center"} sx={{ marginBottom: "12px" }}>
        {type === "signUp" ? "Create an account" : "Welcome Back"}
      </DialogTitle>
      <DialogContent>
        {type === "signUp" ? <SignUpForm /> : <LoginForm />}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
