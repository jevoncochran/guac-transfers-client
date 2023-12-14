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
import {
  getLanguageByCode,
  getCountryByCode,
} from "../utils/getLanguageAndCountry";

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
          // Grab full language object using lang code provided by API call
          const userLang = getLanguageByCode(res.data.language);
          // Grab full country object using country code provided by API call
          const userCountry = getCountryByCode(res.data.country);
          dispatch(
            retrieveUser({
              ...res.data,
              language: userLang,
              country: userCountry,
            })
          );
          dispatch(closeAuthModal());
          navigate("/transfer/send");
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
