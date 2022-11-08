import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../types";

type IProps = {
  movie: IMovie;
};
const Movie = ({ movie }: IProps) => {
  const navigate = useNavigate();
  return (
    <div className="movie">
      <div
        className="movieImage"
        onClick={() => navigate(`/movie/${movie.id}`)}
      >
        <img src={movie.imageUrl} alt={movie.title} />
      </div>
      <Typography variant="caption">
        <b>{movie.title}</b> {movie.year}
      </Typography>
    </div>
  );
};

export default Movie;
