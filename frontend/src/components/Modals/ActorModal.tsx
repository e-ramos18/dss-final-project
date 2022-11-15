import LoadingButton from "@mui/lab/LoadingButton";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Box, MenuItem, TextField } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ErrorContext, ErrorContextType } from "../../context/ErrorProvider";
import { IActor } from "../../types";
import { addActor, editActor } from "../../misc/actor";
import { isNotEmpty, throwError } from "../../utils";
import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";

const genders = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

type Iprops = {
  open: boolean;
  handleClose: () => void;
  actorToEdit?: IActor;
  title?: string;
};

const ActorModal = ({ open, handleClose, actorToEdit, title }: Iprops) => {
  const { loading } = useAppSelector((state) => state.actor);
  const dispatch = useAppDispatch();
  const context = useContext(ErrorContext) as ErrorContextType;
  const [newActor, setNewActor] = useState<IActor>({
    fname: "",
    lname: "",
    age: "",
    about: "",
    gender: "",
    imageUrl: "",
  });
  const resetForm = () => {
    setNewActor({
      fname: "",
      lname: "",
      age: "",
      about: "",
      gender: "",
      imageUrl: "",
    });
  };

  useEffect(() => {
    if (actorToEdit) {
      setNewActor({
        fname: actorToEdit.fname,
        lname: actorToEdit.lname,
        age: actorToEdit.age,
        about: actorToEdit.about,
        gender: actorToEdit.gender,
        imageUrl: actorToEdit.imageUrl,
      });
    }
  }, [actorToEdit]);

  const handleSubmit = async () => {
    try {
      isNotEmpty(newActor.fname, "first name");
      isNotEmpty(newActor.lname, "last name");
      isNotEmpty(newActor.age, "age");
      isNotEmpty(newActor.about, "about");
      isNotEmpty(newActor.imageUrl, "image");
      isNotEmpty(newActor.gender, "gender");
      const actor: IActor = {
        fname: newActor.fname,
        lname: newActor.lname,
        about: newActor.about,
        age: newActor.age,
        gender: newActor.gender,
        imageUrl: newActor.imageUrl,
      };
      if (actorToEdit) {
        actor.id = actorToEdit.id;
        const res = await dispatch(editActor(actor));
        throwError(res.payload);
      } else {
        const res = await dispatch(addActor(actor));
        throwError(res.payload);
      }
      resetForm();
      handleClose();
    } catch (error: any) {
      if (context !== null) {
        context.setErrorMessage(error.message);
      }
    }
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
          {title ? title : "Add Actor"}
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
                label="First name"
                value={newActor.fname}
                onChange={(e) =>
                  setNewActor({ ...newActor, fname: e.target.value })
                }
              />
            </div>
            <div className="ma-sm">
              <TextField
                fullWidth
                label="Last name"
                value={newActor.lname}
                onChange={(e) =>
                  setNewActor({ ...newActor, lname: e.target.value })
                }
              />
            </div>
            <div className="ma-sm">
              <TextField
                fullWidth
                label="Age"
                value={newActor.age}
                onChange={(e) =>
                  setNewActor({ ...newActor, age: e.target.value })
                }
              />
            </div>
            <div className="ma-sm">
              <TextField
                fullWidth
                label="About"
                value={newActor.about}
                onChange={(e) =>
                  setNewActor({ ...newActor, about: e.target.value })
                }
              />
            </div>
            <div className="ma-sm">
              <TextField
                fullWidth
                label="Image URL"
                value={newActor.imageUrl}
                onChange={(e) =>
                  setNewActor({ ...newActor, imageUrl: e.target.value })
                }
              />
            </div>
            <div className="ma-sm">
              <TextField
                data-testid="selectGender"
                fullWidth
                select
                label="Select gender"
                value={newActor.gender}
                onChange={(e) =>
                  setNewActor({ ...newActor, gender: e.target.value })
                }
              >
                {genders.map((option) => (
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

export default ActorModal;
