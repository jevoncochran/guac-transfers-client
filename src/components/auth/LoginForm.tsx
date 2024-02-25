import { ChangeEvent, FormEvent, useState } from "react";
import AuthDialogButton from "./AuthDialogButton";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { retrieveUser } from "../../redux/features/auth/authSlice";
import {
  openRegisterModal,
  closeAuthModal,
} from "../../redux/features/ui/uiSlice";
import {
  getLanguageByCode,
  getCountryByCode,
} from "../../utils/getLanguageAndCountry";
import InputGroup from "../InputGroup";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          // Grab full language object using lang code provided by API call
          const userLang = getLanguageByCode(res.data.language);
          // Grab full country object using country code provided by API call
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

  const handleJoinNow = () => {
    dispatch(closeAuthModal());
    dispatch(openRegisterModal());
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        inputName="email"
        label={t("auth.login.inputs.email.label")}
        value={credentials.email}
        type="email"
        placeholder={t("auth.login.inputs.email.placeholder")}
        onChange={handleChange}
      />
      <InputGroup
        inputName="password"
        label={t("auth.login.inputs.password.label")}
        value={credentials.password}
        type="password"
        placeholder={t("auth.login.inputs.password.placeholder")}
        onChange={handleChange}
      />
      <AuthDialogButton
        label={t("auth.login.submitButton")}
        disabled={loading}
      />
      <Typography>
        {t("auth.login.register.text")}{" "}
        <span
          style={{
            color: "#609000",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={handleJoinNow}
        >
          {t("auth.login.register.clickable")}
        </span>
      </Typography>
    </form>
  );
};

export default LoginForm;
