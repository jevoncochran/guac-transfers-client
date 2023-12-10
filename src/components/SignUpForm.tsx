import { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const SignUpForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
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
      <Button variant="contained" sx={{ marginBottom: "12px" }}>
        Join Now
      </Button>
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
    </div>
  );
};

export default SignUpForm;
