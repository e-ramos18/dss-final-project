import LoadingButton from "@mui/lab/LoadingButton";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Box, Rating, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ErrorContext, ErrorContextType } from "../../context/ErrorProvider";
import { APIResponse, IReview, IUser } from "../../types";
import { getCurrentUser } from "../../misc/auth";
import { addReview } from "../../misc/review";
import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { isNotEmpty, throwError } from "../../utils";

type Iprops = {
  open: boolean;
  movieId?: string;
  handleClose: () => void;
  setInfoMessage: (message: string) => void;
};

const AddReviewModal = ({
  open,
  movieId,
  handleClose,
  setInfoMessage,
}: Iprops) => {
  const { loading } = useAppSelector((state) => state.actor);
  const dispatch = useAppDispatch();
  const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
  const [newRating, setNewRating] = useState<IReview>({
    movieId: "",
    userId: "",
    description: "",
    rating: 0,
    isApproved: false,
  });
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    onMount();
  }, []);

  const onMount = async () => {
    const res: APIResponse = await getCurrentUser();
    if (!res.data && res.error) {
      return setErrorMessage(res.error);
    }
    setCurrentUser(res.data);
  };

  const resetForm = () => {
    setNewRating({
      movieId: "",
      userId: "",
      description: "",
      rating: 0,
      isApproved: false,
    });
  };

  const handleSubmit = async () => {
    try {
      if (!currentUser?.id || !movieId) return;
      isNotEmpty(newRating.description, "description");
      if (!newRating.rating) throw new Error("Please add rating.");
      const review: IReview = {
        description: newRating.description,
        rating: newRating.rating,
        userId: currentUser.id,
        movieId: movieId,
        isApproved: false,
      };

      const res = await dispatch(addReview(review));
      throwError(res.payload);
      setInfoMessage("Review is pending to be approved.");
      resetForm();
      handleClose();
    } catch (error: any) {
      setErrorMessage(error.message);
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
          Add Review
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
                label="Description"
                value={newRating.description}
                onChange={(e) =>
                  setNewRating({ ...newRating, description: e.target.value })
                }
              />
            </div>
            <div className="ma-sm">
              <Typography component="legend">Rate Movie</Typography>
              <Rating
                size="large"
                value={newRating.rating}
                onChange={(_event, newValue) => {
                  if (!newValue) return;
                  setNewRating({ ...newRating, rating: newValue });
                }}
              />
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

export default AddReviewModal;
