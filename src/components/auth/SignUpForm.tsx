import { ChangeEvent, FormEvent, useState } from "react";
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
import InputGroup from "../InputGroup";

const SignUpForm = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
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
              stripeCustomerId: res.data.stripe_customer_id,
              stripe_customer_id: undefined,
            })
          );
          dispatch(closeAuthModal());
          navigate("/transfer/send");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        inputName="firstName"
        label="First Name"
        value={credentials.firstName}
        type="text"
        placeholder="Please enter your your first name"
        onChange={handleChange}
      />

      <InputGroup
        inputName="lastName"
        label="Last Name"
        value={credentials.lastName}
        type="text"
        placeholder="Please enter your your last name"
        onChange={handleChange}
      />

      <InputGroup
        inputName="email"
        label="Email Address"
        value={credentials.email}
        type="email"
        placeholder="Please enter your email address"
        onChange={handleChange}
      />

      <InputGroup
        inputName="password"
        label="Password"
        value={credentials.password}
        type="password"
        placeholder="Please enter your password"
        onChange={handleChange}
      />

      <InputGroup
        inputName="passwordConfirm"
        label="Confirm Password"
        value={credentials.passwordConfirm}
        type="password"
        placeholder="Please confirm your password"
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
