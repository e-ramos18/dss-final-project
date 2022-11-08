import {
  Autocomplete,
  Backdrop,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Movie from "../components/Movie";
import { fetchMovies } from "../misc/movie";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { IMovie } from "../types";
import { ErrorContext, ErrorContextType } from "../context/ErrorProvider";

const MoviesList = () => {
  const movies = useAppSelector((state) => state.movie.movies);
  const loading = useAppSelector((state) => state.movie.loading);
  const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
  const dispatch = useAppDispatch();
  const [filteredMovies, setFilteredMovies] = useState<IMovie[] | null>(null);

  useEffect(() => {
    onMount();
  }, [movies.length]);
  const onMount = async () => {
    const res = await dispatch(fetchMovies());
    if (res.type === "movie/fetchMovies/rejected") {
      //@ts-ignore
      setErrorMessage(res.error.message);
    }
    setFilteredMovies(movies);
  };

  const handleSearchChange = (_event: object, value: string) => {
    const filtered = movies.filter(
      (movie) =>
        movie.title.includes(value) ||
        movie.description.includes(value) ||
        movie.cost.includes(value) ||
        movie.year.includes(value)
    );
    setFilteredMovies(filtered);
  };

  const resetTable = () => {
    setFilteredMovies(movies);
  };

  return (
    <>
      <Typography variant="h6">Movies</Typography>
      <div className="ma-sm">
        <Autocomplete
          freeSolo
          disableClearable
          options={movies.map((option) => option.title)}
          onChange={handleSearchChange}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search Movie"
              InputProps={{
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Reset">
                      <IconButton onClick={() => resetTable()}>
                        <RestartAltIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          )}
        />
      </div>

      {filteredMovies && filteredMovies.length > 0 ? (
        <div className="moviesList">
          {filteredMovies.map((movie) => (
            <Movie movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <h2 className="center">No Movies.</h2>
      )}
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default MoviesList;
