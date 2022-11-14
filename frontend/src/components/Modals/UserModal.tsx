import LoadingButton from "@mui/lab/LoadingButton";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Box, MenuItem, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ErrorContext, ErrorContextType } from "../../context/ErrorProvider";
import { IUser, Roles } from "../../types";
import {
  isNotEmpty,
  throwError,
  validatEmail,
  validatePassword,
} from "../../utils";
import { addUser, editUser } from "../../misc/user";
import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";

type Iprops = {
  open: boolean;
  handleClose: () => void;
  userToEdit?: IUser;
  title?: string;
};

const roles = [
  {
    value: Roles.User,
    label: Roles.User,
  },
  {
    value: Roles.Admin,
    label: Roles.Admin,
  },
];

const AddUserModal = ({ open, handleClose, userToEdit, title }: Iprops) => {
  const { loading } = useAppSelector((state) => state.actor);
  const dispatch = useAppDispatch();
  const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
  const [newUser, setNewUser] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    role: Roles.User,
  });
  const [cpassword, setCpassword] = useState("");

  useEffect(() => {
    if (userToEdit) {
      setNewUser({
        name: userToEdit.name,
        email: userToEdit.email,
        role: Roles.User,
      });
    }
  }, []);

  const resetForm = () => {
    setNewUser({
      name: "",
      email: "",
      password: "",
      role: Roles.User,
    });
    setCpassword("");
  };

  const handleEdit = async () => {
    try {
      isNotEmpty(newUser.name, "name");
      isNotEmpty(newUser.email, "email");
      if (validatEmail(newUser.email))
        throw new Error("Please add a valid email.");
      if (userToEdit) {
        const updated: IUser = {
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        };
        if (
          updated.name === userToEdit.name &&
          updated.email === userToEdit.email &&
          updated.role === userToEdit.role
        ) {
          resetForm();
          return handleClose();
        }
        updated.id = userToEdit.id;
        const res = await dispatch(editUser(updated));
        throwError(res.payload);
        resetForm();
        handleClose();
      }
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const handleAddUser = async () => {
    try {
      isNotEmpty(newUser.name, "name");
      isNotEmpty(newUser.email, "email");
      if (validatEmail(newUser.email))
        throw new Error("Please add a valid email.");
      validatePassword(newUser.password, "password");
      validatePassword(cpassword, "confirm password");
      if (newUser.password !== cpassword)
        throw new Error("Passwords should match.");
      const user: IUser = {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      };
      const res = await dispatch(addUser(user));
      throwError(res.payload);
      resetForm();
      handleClose();
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const handleSubmit = async () => {
    userToEdit ? handleEdit() : handleAddUser();
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {title ? title : "Add User"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              width: 400,
            }}
          >
            <div className="ma-sm">
              <TextField
                fullWidth
                label="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </div>
            <div className="ma-sm">
              <TextField
                fullWidth
                label="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            {userToEdit ? null : (
              <>
                <div className="ma-sm">
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                  />
                </div>
                <div className="ma-sm">
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="ma-sm">
              <TextField
                fullWidth
                select
                label="Select Role"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value as Roles })
                }
              >
                {roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            variant="outlined"
            loading={loading}
            onClick={handleSubmit}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default AddUserModal;
