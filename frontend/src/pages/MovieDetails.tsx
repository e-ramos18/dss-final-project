import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddReviewModal from "../components/AddReviewModal";
import MovieReview from "../components/MovieReview";
import { ErrorContext, ErrorContextType } from "../context/ErrorProvider";
import { fetchActors } from "../misc/actor";
import { getCurrentUser } from "../misc/auth";
import { fetchMovie } from "../misc/movie";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { APIResponse, IUser, Roles } from "../types";
import { getItem } from "../utils";

type IParams = {
  id: string;
};

const MovieDetails = () => {
  const { id } = useParams<IParams>();
  const navigate = useNavigate();
  const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
  const movie = useAppSelector((state) => state.movie.movie);
  const loading = useAppSelector((state) => state.movie.loading);
  const actors = useAppSelector((state) => state.actor.actors);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [info, setInfo] = useState("");

  useEffect(() => {
    onMount();
  }, [id]);
  const onMount = async () => {
    if (!id) return;
    const res = await dispatch(fetchMovie(id));
    if (res.type === "movie/fetchMovie/rejected") {
      //@ts-ignore
      setErrorMessage(res.error.message);
    }
    const response = await dispatch(fetchActors());
    if (response.type === "actor/fetchActors/rejected") {
      //@ts-ignore
      setErrorMessage(res.error.message);
    }
    if (!getItem("token")) return;
    const resp: APIResponse = await getCurrentUser();
    if (!resp.data && resp.error) {
      return setErrorMessage(resp.error);
    }
    setCurrentUser(resp.data);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setInfo("");
  };

  const setInfoMessage = (message: string): void => {
    setInfo(message);
  };

  const handleAddReview = () => {
    const token = getItem("token");
    if (!token) return setInfoMessage("Please login to add a review.");
    if (currentUser && currentUser.role !== Roles.User) {
      return setErrorMessage("Admin cannot add reviews.");
    }
    setOpen(true);
  };

  return (
    <>
      {movie && (
        <>
          <Paper className="movieDetails" elevation={2}>
            <img src={movie.imageUrl} alt={movie.title} />
            <div className="details">
              <Typography variant="h3">{movie.title}</Typography>
              <Typography variant="h5">{movie.year}</Typography>
              <p>{movie.description}</p>
              {movie.actorsIds && (
                <>
                  <Typography variant="h6">Actors</Typography>
                  {actors && (
                    <>
                      {actors.map((actor) => {
                        if (actor.id && movie.actorsIds?.includes(actor.id)) {
                          return (
                            <span key={actor.id}>
                              <Button
                                variant="text"
                                onClick={() => navigate(`/actor/${actor.id}`)}
                              >
                                {actor.fname} {actor.lname}
                              </Button>
                            </span>
                          );
                        }
                      })}
                    </>
                  )}
                </>
              )}
              {!movie.reviews && <p>No reviews yet.</p>}
              <br />
              <br />
              <Button variant="contained" onClick={handleAddReview}>
                Add Review
              </Button>
            </div>
          </Paper>
          {movie.reviews && (
            <>
              <h3>Reviews</h3>
              {movie.reviews.map((review) => {
                if (review.isApproved) {
                  return <MovieReview review={review} key={review.id} />;
                }
              })}
            </>
          )}
          {open && (
            <AddReviewModal
              open={open}
              movieId={movie.id}
              handleClose={() => setOpen(false)}
              setInfoMessage={setInfoMessage}
            />
          )}
        </>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={info !== ""}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          {info}
        </Alert>
      </Snackbar>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default MovieDetails;
