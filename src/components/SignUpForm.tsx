import { ChangeEvent, FormEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import AuthDialogButton from "./AuthDialogButton";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();

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
      .post(`${import.meta.env.VITE_API_URL}/auth/register`, credentials)
      .then((res) => {
        if (res.status === 201) {
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/us/en/transfer/send");
        }
      });
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
      <TextField
        name="passwordConfirm"
        label="Confirm Password"
        variant="outlined"
        fullWidth
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
        >
          Sign In
        </span>
      </Typography>
    </form>
  );
};

export default SignUpForm;
