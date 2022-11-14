import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Movie from "../components/Movie";
import { fetchMovies, searchMovies } from "../misc/movie";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ErrorContext, ErrorContextType } from "../context/ErrorProvider";
import { throwError } from "../utils";
import SearchInput from "../components/SearchInput";
import { setFilteredMovies } from "../features/movie/movieSlice";

const MoviesList = () => {
  const movies = useAppSelector((state) => state.movie.movies);
  const { loading, filteredMovies } = useAppSelector((state) => state.movie);
  const { setErrorMessage } = useContext(ErrorContext) as ErrorContextType;
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    onMount();
  }, []);
  const onMount = async () => {
    try {
      const res = await dispatch(fetchMovies());
      throwError(res.payload);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const onSearch = async () => {
    try {
      const res = await dispatch(searchMovies(searchValue));
      throwError(res.payload);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleSearchChange = (key: string) => {
    setSearchValue(key);
  };

  const resetTable = () => {
    dispatch(setFilteredMovies(movies));
  };

  return (
    <>
      <Typography variant="h6">Movies</Typography>
      <div className="ma-sm">
        <SearchInput
          value={searchValue}
          onChange={handleSearchChange}
          onSearch={onSearch}
          reset={resetTable}
        />
      </div>
      {filteredMovies?.length > 0 && (
        <div className="moviesList">
          {filteredMovies.map((movie) => (
            <Movie movie={movie} key={movie.id} />
          ))}
        </div>
      )}
      {!loading && filteredMovies.length <= 0 && (
        <h2 className="center">No Movies.</h2>
      )}
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default MoviesList;
