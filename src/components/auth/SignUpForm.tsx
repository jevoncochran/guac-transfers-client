import { ChangeEvent, FormEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import AuthDialogButton from "./AuthDialogButton";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import {
  openLoginModal,
  closeAuthModal,
} from "../../redux/features/ui/uiSlice";
import { retrieveUser } from "../../redux/features/auth/authSlice";
import {
  getCountryByCode,
  getLanguageByCode,
} from "../../utils/getLanguageAndCountry";

const SignUpForm = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        ...credentials,
        language: JSON.parse(localStorage.getItem("language")!).code,
        country: JSON.parse(localStorage.getItem("country")!).code,
      })
      .then((res) => {
        if (res.status === 201) {
          // Grab full language object using lang code provided by API call
          const userLang = getLanguageByCode(res.data.language);
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

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        label={credentials.email ? "" : "Email Address"}
        type="email"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: false }}
        onChange={handleChange}
      />
      <TextField
        name="password"
        label={credentials.password ? "" : "Password"}
        type="password"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: false }}
        onChange={handleChange}
      />
      <TextField
        name="passwordConfirm"
        label={credentials.passwordConfirm ? "" : "Confirm Password"}
        type="password"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: false }}
        onChange={handleChange}
      />
      <AuthDialogButton label="Join Now" />
      <Typography>
        Already have an account?{" "}
        <span
          style={{
            color: "#609000",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => dispatch(openLoginModal())}
        >
          Sign In
        </span>
      </Typography>
    </form>
  );
};

export default SignUpForm;
