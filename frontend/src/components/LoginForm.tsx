import { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { isNotEmpty, validatEmail, validatePassword } from "../utils";
import { login } from "../misc/auth";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ErrorContextType } from "../context/ErrorProvider";

const LoginForm = () => {
  const context = useContext(ErrorContext) as ErrorContextType;
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      isNotEmpty(credentials.email, "email");
      if (validatEmail(credentials.email))
        throw new Error("Please add a valid email.");
      validatePassword(credentials.password, "password");
      const err: string = await login(credentials.email, credentials.password);
      if (err) throw new Error(err);
      navigate("/");
    } catch (error: any) {
      if (context !== null) {
        context.setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className="center">
      <h1>Login</h1>
      <div className="ma-sm">
        <TextField
          label="Email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
      </div>
      <div className="ma-sm">
        <TextField
          data-testid="pass"
          label="Password"
          value={credentials.password}
          type="password"
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
      </div>
      <Button variant="contained" onClick={handleRegister}>
        Login
      </Button>
      <div>
        Doesn't an account?
        <Button variant="text" onClick={() => navigate("/register")}>
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
