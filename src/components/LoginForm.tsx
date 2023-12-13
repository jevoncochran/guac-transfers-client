import { ChangeEvent, FormEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import AuthDialogButton from "./AuthDialogButton";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { retrieveUser } from "../redux/features/auth/authSlice";
import {
  openRegisterModal,
  closeAuthModal,
} from "../redux/features/ui/uiSlice";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials)
      .then((res) => {
        if (res.status === 200) {
          dispatch(retrieveUser(res.data));
          dispatch(closeAuthModal());
          navigate("/us/en/transfer/send");
        }
      });
  };

  const handleJoinNow = () => {
    dispatch(closeAuthModal());
    dispatch(openRegisterModal());
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        label="Email Address"
        variant="outlined"
        fullWidth
        onChange={handleChange}
      />
      <TextField
        name="password"
        label="Password"
        variant="outlined"
        fullWidth
        onChange={handleChange}
      />
      <AuthDialogButton label="Sign In" />
      <Typography>
        Need an account?{" "}
        <span
          style={{
            color: "#609000",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={handleJoinNow}
        >
          Join Now
        </span>
      </Typography>
    </form>
  );
};

export default LoginForm;
