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
import { useTranslation } from "react-i18next";

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
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        ...credentials,
        language: JSON.parse(localStorage.getItem("language")!).code,
        country: JSON.parse(localStorage.getItem("country")!).code,
      })
      .then((res) => {
        setLoading(false);
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
              phone:
                res.data.phoneIso && res.data.phoneNum
                  ? {
                      iso: res.data.phoneIso,
                      prefix: res.data.phoneNum.split(" ")[0],
                      body: res.data.phoneNum.split(" ")[1],
                    }
                  : null,
              phoneIso: undefined,
              phoneNum: undefined,
            })
          );
          dispatch(closeAuthModal());
          navigate("/transfer/send");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* First Name */}
      <InputGroup
        inputName="firstName"
        label={t("auth.register.inputs.firstName.label")}
        value={credentials.firstName}
        type="text"
        placeholder={t("auth.register.inputs.firstName.placeholder")}
        onChange={handleChange}
      />

      {/* Last Name */}
      <InputGroup
        inputName="lastName"
        label={t("auth.register.inputs.lastName.label")}
        value={credentials.lastName}
        type="text"
        placeholder={t("auth.register.inputs.lastName.placeholder")}
        onChange={handleChange}
      />

      {/* Email Address */}
      <InputGroup
        inputName="email"
        label={t("auth.register.inputs.email.label")}
        value={credentials.email}
        type="email"
        placeholder={t("auth.register.inputs.email.placeholder")}
        onChange={handleChange}
      />

      {/* Password */}
      <InputGroup
        inputName="password"
        label={t("auth.register.inputs.password.label")}
        value={credentials.password}
        type="password"
        placeholder={t("auth.register.inputs.password.placeholder")}
        onChange={handleChange}
      />

      {/* Confirm Password */}
      <InputGroup
        inputName="passwordConfirm"
        label={t("auth.register.inputs.passwordConfirm.label")}
        value={credentials.passwordConfirm}
        type="password"
        placeholder={t("auth.register.inputs.passwordConfirm.placeholder")}
        onChange={handleChange}
      />

      {/* Submit Button */}
      <AuthDialogButton
        label={t("auth.register.submitButton")}
        disabled={loading}
      />

      {/* Sign in instead */}
      <Typography>
        {t("auth.register.login.text")}{" "}
        <span
          style={{
            color: "#609000",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => dispatch(openLoginModal())}
        >
          {t("auth.register.login.clickable")}
        </span>
      </Typography>
    </form>
  );
};

export default SignUpForm;
