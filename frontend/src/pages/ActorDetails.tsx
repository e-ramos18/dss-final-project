import { Paper, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";
import { ErrorContext, ErrorContextType } from "../context/ErrorProvider";
import { fetchActor } from "../misc/actor";
import { fetchMovies } from "../misc/movie";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

type IParams = {
  id: string;
};

const ActorDetails = () => {
  const { id } = useParams<IParams>();
  const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
  const actor = useAppSelector((state) => state.actor.actor);
  const movies = useAppSelector((state) => state.movie.movies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onMount();
  }, [id]);
  const onMount = async () => {
    if (!id) return;
    const res = await dispatch(fetchActor(id));
    if (res.type === "actor/fetchActor/rejected") {
      //@ts-ignore
      setErrorMessage(res.error.message);
    }
    const resp = await dispatch(fetchMovies());
    if (resp.type === "movie/fetchMovie/rejected") {
      //@ts-ignore
      setErrorMessage(resp.error.message);
    }
  };

  const renderMovies = () => {
    if (!movies || !id) return;
    const actorMovies = movies.filter((movie) => movie.actorsIds?.includes(id));
    if (!actorMovies || !actorMovies.length) return;
    return (
      <>
        <h4>Movie Casted</h4>
        <div className="moviesList">
          {actorMovies.map((movie) => (
            <Movie movie={movie} key={movie.id} />
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      {actor && (
        <>
          <h3>{actor.gender === "Male" ? "Actor" : "Actress"}</h3>
          <Paper className="actorDetails" elevation={3}>
            <div className="actorImage">
              <img src={actor.imageUrl} alt={actor.fname} />
            </div>
            <div className="details ma-sm">
              <Typography variant="h3">
                {actor.fname} {actor.lname}
              </Typography>
              <Typography variant="h5">{actor.age}</Typography>
              <p>{actor.about}</p>
            </div>
          </Paper>
          {renderMovies()}
        </>
      )}
    </>
  );
};

export default ActorDetails;
