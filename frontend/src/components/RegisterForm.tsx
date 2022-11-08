import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext, useEffect } from "react";
import { validatEmail } from "../utils";
import { register } from "../misc/auth";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ErrorContextType } from "../context/ErrorProvider";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchUsers } from "../misc/user";
import { Roles } from "../types";

const errors = {
  name: "Please add a name.",
  email: "Please enter a valid email.",
  password: "Please add a password.",
  cpassword: "Please confirm password.",
  chars: "Should be atleast 8 characters.",
  match: "Passwords should match.",
};

const RegisterForm = () => {
  const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameInvalid, setNameInvalid] = useState("");
  const [email, setEmail] = useState("");
  const [emailInvalid, setEmailInvalid] = useState("");
  const [password, setPassword] = useState("");
  const [passwordInvalid, setPasswordInvalid] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [cpasswordInvalid, setCpasswordInvalid] = useState("");

  useEffect(() => {
    onMount();
  }, [users.length]);
  const onMount = async () => {
    const res = await dispatch(fetchUsers());
    if (res.type === "user/fetchUsers/rejected") {
      //@ts-ignore
      setErrorMessage(res.error.message);
    }
  };

  const validateForm = (): string => {
    if (!name) {
      setNameInvalid(errors.name);
      return errors.name;
    } else {
      setNameInvalid("");
    }
    if (validatEmail(email)) {
      setEmailInvalid(errors.email);
      return errors.email;
    } else {
      setEmailInvalid("");
    }
    if (!password) {
      setPasswordInvalid(errors.password);
      return errors.password;
    } else if (password.length < 8) {
      setPasswordInvalid(errors.chars);
      return errors.chars;
    } else {
      setPasswordInvalid("");
    }

    if (!cpassword) {
      setCpasswordInvalid(errors.cpassword);
      return errors.cpassword;
    } else if (cpassword.length < 8) {
      setCpasswordInvalid(errors.chars);
      return errors.chars;
    } else {
      setCpasswordInvalid("");
    }

    if (password !== cpassword) {
      setPasswordInvalid(errors.match);
      setCpasswordInvalid(errors.match);
      return errors.match;
    } else {
      setPasswordInvalid("");
      setCpasswordInvalid("");
    }
    return "";
  };

  const handleRegister = async () => {
    if (validateForm()) return;
    const role = users.length > 0 ? Roles.User : Roles.RootAdmin;
    const isApproved = users.length === 0;
    const err: string = await register(name, email, password, role, isApproved);
    if (!err) {
      navigate("/login");
    }
    setErrorMessage(err);
  };

  return (
    <div className="center">
      <h1>Register</h1>
      <div className="ma-sm">
        <TextField
          label="Name"
          helperText={nameInvalid}
          error={nameInvalid !== ""}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="ma-sm">
        <TextField
          label="Email"
          helperText={emailInvalid}
          error={emailInvalid !== ""}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="ma-sm">
        <TextField
          label="Password"
          type="password"
          helperText={passwordInvalid}
          error={passwordInvalid !== ""}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="ma-sm">
        <TextField
          label="Confirm Password"
          type="password"
          helperText={cpasswordInvalid}
          error={cpasswordInvalid !== ""}
          value={cpassword}
          onChange={(e) => setCpassword(e.target.value)}
        />
      </div>
      <Button variant="contained" onClick={handleRegister}>
        Register
      </Button>
      <div>
        Already have an account?
        <Button variant="text" onClick={() => navigate("/login")}>
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
