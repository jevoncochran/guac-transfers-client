import { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import AuthDialogButton from "./AuthDialogButton";
import Typography from "@mui/material/Typography";
import axios from "axios";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault();

  //   axios
  //     .post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials)
  //     .then((res) => {
  //       console.log(res);
  //     });
  // };

  return (
    <form>
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
        >
          Join Now
        </span>
      </Typography>
    </form>
  );
};

export default LoginForm;
