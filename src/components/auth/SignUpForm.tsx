import { ChangeEvent, FormEvent, useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import AuthDialogButton from "./AuthDialogButton";
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
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { isValidEmail } from "../../utils/isValidEmail";
import { identifyMissingFields } from "../../utils/missingFieldCheck";
import FormErrorAlert from "../FormErrorAlert";

const SignUpForm = () => {
  const dispatch = useAppDispatch();

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [requiredFieldsError, setRequiredFieldsError] = useState("");
  const [existingUserError, setExistingUserError] = useState("");

  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordMatchError("");
    setRequiredFieldsError("");
    setExistingUserError("");

    // Validate required fields
    if (
      !credentials.firstName ||
      !credentials.lastName ||
      !credentials.email ||
      !credentials.password ||
      !credentials.passwordConfirm
    ) {
      setRequiredFieldsError("All fields are required");
      return;
    }

    // Validate email format
    if (!isValidEmail(credentials.email)) {
      setEmailError("Invalid email format");
      return;
    }

    // Validate password match
    if (credentials.password !== credentials.passwordConfirm) {
      setPasswordMatchError("Passwords do not match");
      return;
    }

    setLoading(true);
    setOpenSnackbar(true);
    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        ...credentials,
        language: JSON.parse(localStorage.getItem("language")!).code,
        country: JSON.parse(localStorage.getItem("country")!).code,
      })
      .then((res) => {
        setLoading(false);
        if (res.status === 201) {
          // Delay the navigation by 10 seconds in development environment
          const isDevelopment = import.meta.env.VITE_NODE_ENV === "development";
          const delaySeconds = isDevelopment ? 10000 : 0; // 10 seconds delay

          // Grab full language object using lang code provided by API call
          const userLang = getLanguageByCode(res.data.language);
          const userCountry = getCountryByCode(res.data.country);

          setTimeout(() => {
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
          }, delaySeconds);
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 409) {
          setExistingUserError("A user with this email already exists");
        }
      });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openSnackbar}
        onClose={handleCloseSnackbar} // Triggered when the Snackbar is closed
        autoHideDuration={5000}
      >
        <Alert
          variant="filled"
          severity="info"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          The server may need to fire up and this usually takes around 50
          seconds. Apologies for the wait!
        </Alert>
      </Snackbar>

      <form onSubmit={handleSubmit}>
        <FormErrorAlert error={requiredFieldsError} />
        <FormErrorAlert error={passwordMatchError} />
        <FormErrorAlert error={existingUserError} />

        {/* First Name */}
        <InputGroup
          inputName="firstName"
          label={t("auth.register.inputs.firstName.label")}
          value={credentials.firstName}
          type="text"
          placeholder={t("auth.register.inputs.firstName.placeholder")}
          onChange={handleChange}
          error={identifyMissingFields(
            requiredFieldsError,
            credentials.firstName
          )}
        />

        {/* Last Name */}
        <InputGroup
          inputName="lastName"
          label={t("auth.register.inputs.lastName.label")}
          value={credentials.lastName}
          type="text"
          placeholder={t("auth.register.inputs.lastName.placeholder")}
          onChange={handleChange}
          error={identifyMissingFields(
            requiredFieldsError,
            credentials.lastName
          )}
        />

        {/* Email Address */}
        <InputGroup
          inputName="email"
          label={t("auth.register.inputs.email.label")}
          value={credentials.email}
          type="text"
          placeholder={t("auth.register.inputs.email.placeholder")}
          onChange={handleChange}
          error={
            identifyMissingFields(requiredFieldsError, credentials.email) ||
            emailError
          }
        />

        {/* Password */}
        <InputGroup
          inputName="password"
          label={t("auth.register.inputs.password.label")}
          value={credentials.password}
          type="password"
          placeholder={t("auth.register.inputs.password.placeholder")}
          onChange={handleChange}
          error={identifyMissingFields(
            requiredFieldsError,
            credentials.password
          )}
        />

        {/* Confirm Password */}
        <InputGroup
          inputName="passwordConfirm"
          label={t("auth.register.inputs.passwordConfirm.label")}
          value={credentials.passwordConfirm}
          type="password"
          placeholder={t("auth.register.inputs.passwordConfirm.placeholder")}
          onChange={handleChange}
          error={
            identifyMissingFields(
              requiredFieldsError,
              credentials.passwordConfirm
            ) || passwordMatchError
          }
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
    </>
  );
};

export default SignUpForm;
