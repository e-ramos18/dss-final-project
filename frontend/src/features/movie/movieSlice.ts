import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addMovie,
  deleteMovie,
  editMovie,
  fetchMovie,
  fetchMovies,
  searchMovies,
} from "../../misc/movie";
import { CustomApiResponse, IMovie } from "../../types";

export type InitialState = {
  movies: IMovie[];
  filteredMovies: IMovie[];
  movie: IMovie | null;
  loading: boolean;
  apiMessage: "";
};
const initialState: InitialState = {
  movies: [],
  filteredMovies: [],
  movie: null,
  loading: false,
  apiMessage: "",
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setFilteredMovies(state, action) {
      state.filteredMovies = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch movies
    builder.addCase(fetchMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchMovies.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        state.loading = false;
        state.movies = action.payload.data as IMovie[];
        state.filteredMovies = action.payload.data as IMovie[];
      }
    );
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.loading = false;
      state.movies = [];
      state.filteredMovies = [];
    });

    // Search movies
    builder.addCase(searchMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      searchMovies.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        state.loading = false;
        state.filteredMovies = action.payload.data as IMovie[];
      }
    );
    builder.addCase(searchMovies.rejected, (state, action) => {
      state.loading = false;
      state.movies = [];
    });

    // Fetch a movie
    builder.addCase(fetchMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchMovie.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        const { data } = action.payload;
        state.loading = false;
        state.movie = data as IMovie;
      }
    );
    builder.addCase(fetchMovie.rejected, (state, action) => {
      state.loading = false;
      state.movie = null;
    });

    // Add a movie
    builder.addCase(addMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      addMovie.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        state.loading = false;
        state.movies = state.movies.concat(action.payload.data as IMovie);
        state.filteredMovies = state.filteredMovies.concat(
          action.payload.data as IMovie
        );
      }
    );
    builder.addCase(addMovie.rejected, (state, action) => {
      state.loading = false;
    });

    // Edit a movie
    builder.addCase(editMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      editMovie.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        state.loading = false;
        const newMovies: IMovie[] = [...state.movies];
        const data = action.payload.data as IMovie;
        //finding index of the movie
        const index: number = newMovies.findIndex((m) => m.id === data.id);
        newMovies[index] = data;
        state.movies = newMovies;
        state.filteredMovies = newMovies;
      }
    );
    builder.addCase(editMovie.rejected, (state, action) => {
      state.loading = false;
    });

    // Delete a movie
    builder.addCase(deleteMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteMovie.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        const data = action.payload.data as string;
        const newMovies = state.movies.filter(
          (movie: IMovie) => movie.id !== data
        );
        state.loading = false;
        state.movies = newMovies;
        state.filteredMovies = newMovies;
      }
    );
    builder.addCase(deleteMovie.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export const { setFilteredMovies } = movieSlice.actions;
export default movieSlice.reducer;
