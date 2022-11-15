import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext, useEffect } from "react";
import {
  isNotEmpty,
  throwError,
  validatEmail,
  validatePassword,
} from "../utils";
import { register } from "../misc/auth";
import { useNavigate } from "react-router-dom";
import { ErrorContext, ErrorContextType } from "../context/ErrorProvider";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchUsers } from "../misc/user";
import { IUser, Roles } from "../types";

const RegisterForm = () => {
  const context = useContext(ErrorContext) as ErrorContextType;
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const navigate = useNavigate();
  const [cpassword, setCpassword] = useState("");
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    role: Roles.User,
  });

  useEffect(() => {
    onMount();
  }, []);
  const onMount = async () => {
    try {
      const res = await dispatch(fetchUsers());
      throwError(res.payload);
    } catch (error: any) {
      if (context) {
        context.setErrorMessage(error.message);
      }
    }
  };

  const handleRegister = async () => {
    const role = users.length > 0 ? Roles.User : Roles.RootAdmin;
    const isApproved = users.length === 0;
    try {
      isNotEmpty(user.name, "name");
      isNotEmpty(user.email, "email");
      if (validatEmail(user.email))
        throw new Error("Please add a valid email.");
      validatePassword(user.password, "password");
      validatePassword(cpassword, "confirm password");
      if (user.password !== cpassword)
        throw new Error("Passwords should match.");
      const err: string = await register(
        user.name,
        user.email,
        user.password,
        role,
        isApproved
      );
      if (err) throw new Error(err);
      navigate("/login");
    } catch (err: any) {
      if (context !== null) {
        context.setErrorMessage(err.message);
      }
    }
  };

  return (
    <div className="center">
      <h1>Register</h1>
      <div className="ma-sm">
        <TextField
          label="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>
      <div className="ma-sm">
        <TextField
          label="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="ma-sm">
        <TextField
          data-testid="pass"
          label="Password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <div className="ma-sm">
        <TextField
          data-testid="cpass"
          label="Confirm Password"
          type="password"
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
