import LoadingButton from "@mui/lab/LoadingButton";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ErrorContext, ErrorContextType } from "../../context/ErrorProvider";
import { addMovie, editMovie } from "../../misc/movie";
import { IActor, IMovie } from "../../types";
import SelectActor from "../SelectActor";
import { fetchActors } from "../../misc/actor";
import { BootstrapDialog, BootstrapDialogTitle } from "./BootstrapDialog";
import { isNotEmpty, throwError } from "../../utils";

type Iprops = {
  open: boolean;
  handleClose: () => void;
  setOpenAddActor: (value: boolean) => void;
  movieToEdit?: IMovie;
  title?: string;
};

const MovieModal = ({
  open,
  handleClose,
  setOpenAddActor,
  movieToEdit,
  title,
}: Iprops) => {
  const { loading } = useAppSelector((state) => state.movie);
  const actors = useAppSelector((state) => state.actor.actors);
  const dispatch = useAppDispatch();
  const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
  const [movieActors, setMovieActors] = useState<string[]>([]);
  const [newMovie, setNewMovie] = useState<IMovie>({
    title: "",
    description: "",
    cost: "",
    imageUrl: "",
    year: "",
  });

  useEffect(() => {
    onMount();
  }, [movieToEdit]);
  const onMount = async () => {
    if (movieToEdit) {
      setNewMovie({
        title: movieToEdit.title,
        description: movieToEdit.description,
        cost: movieToEdit.cost,
        imageUrl: movieToEdit.imageUrl,
        year: movieToEdit.year,
      });
      if (movieToEdit?.actorsIds !== undefined)
        setMovieActors(movieToEdit.actorsIds);
    }

    try {
      const res = await dispatch(fetchActors());
      throwError(res.payload);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleActorChange = (_event: object, values: IActor[]) => {
    let actorsIds: string[] = [];
    values.forEach((value) => {
      if (typeof value.id === "string") actorsIds.push(value.id);
    });
    setMovieActors(actorsIds);
  };

  const setDefaultValue = (): IActor[] => {
    if (!movieToEdit) return [];
    const filtered = actors.filter((actor: IActor) => {
      if (!actor.id) return false;
      return movieToEdit.actorsIds?.includes(actor.id);
    });
    return filtered;
  };

  const resetForm = () => {
    setNewMovie({
      title: "",
      description: "",
      cost: "",
      imageUrl: "",
      year: "",
      actorsIds: [],
    });
    setMovieActors([]);
  };

  const handleSubmit = async () => {
    try {
      isNotEmpty(newMovie.title, "title");
      isNotEmpty(newMovie.description, "description");
      isNotEmpty(newMovie.cost, "cost");
      isNotEmpty(newMovie.imageUrl, "image");
      isNotEmpty(newMovie.year, "year");
      if (!movieActors.length) throw new Error("Please add atleast one actor.");
      const movie: Partial<IMovie> = {
        title: newMovie.title,
        description: newMovie.description,
        cost: newMovie.cost,
        imageUrl: newMovie.imageUrl,
        year: newMovie.year,
        actorsIds: movieActors,
      };
      if (movieToEdit) {
        movie.id = movieToEdit.id;
        const res = await dispatch(editMovie(movie));
        throwError(res.payload);
      } else {
        const res = await dispatch(addMovie(movie));
        throwError(res.payload);
      }
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
          {title ? title : "Add Movie"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              width: 400,
            }}
          >
            <div className="ma-sm">
              <TextField
                disabled={movieToEdit !== undefined}
                fullWidth
                label="Title"
                value={newMovie.title}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, title: e.target.value })
                }
              />
            </div>
            <div className="ma-sm">
              <TextField
                disabled={movieToEdit !== undefined}
                fullWidth
                label="Description"
                value={newMovie.description}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, description: e.target.value })
                }
              />
            </div>
            <div className="ma-sm">
              <TextField
                fullWidth
                label="Cost"
                value={newMovie.cost}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, cost: e.target.value })
                }
              />
            </div>
            <div className="ma-sm">
              <TextField
                fullWidth
                label="Image URL"
                value={newMovie.imageUrl}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, imageUrl: e.target.value })
                }
              />
            </div>
            <div className="ma-sm">
              <TextField
                disabled={movieToEdit !== undefined}
                fullWidth
                label="Year"
                value={newMovie.year}
                onChange={(e) =>
                  setNewMovie({ ...newMovie, year: e.target.value })
                }
              />
            </div>
            {actors && (
              <div className="ma-sm">
                <SelectActor
                  disabled={movieToEdit !== undefined}
                  options={actors}
                  handleChange={handleActorChange}
                  defaultValue={setDefaultValue()}
                />
              </div>
            )}
            <div className="ma-sm">
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setOpenAddActor(true)}
              >
                Add Actor
              </Button>
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

export default MovieModal;
