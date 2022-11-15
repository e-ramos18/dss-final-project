import reducer, { InitialState } from "../../features/movie/movieSlice";
import {
  addMovie,
  deleteMovie,
  editMovie,
  fetchMovie,
  fetchMovies,
  searchMovies,
} from "../../misc/movie";
import { movieMock, moviesMock } from "../../mocks/mockValues";

describe("Movie Slice ExtraReducers", () => {
  const initialState: InitialState = {
    movies: [],
    filteredMovies: [],
    movie: null,
    loading: false,
    apiMessage: "",
  };

  // Fetch movies
  describe("fetchMovies", () => {
    it("pending", () => {
      const action = { type: fetchMovies.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        filteredMovies: [],
        movie: null,
        loading: true,
        apiMessage: "",
      });
    });

    it("fulfilled", () => {
      const action = { type: fetchMovies.fulfilled.type, payload: moviesMock };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: moviesMock.data,
        filteredMovies: moviesMock.data,
        movie: null,
        loading: false,
        apiMessage: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: fetchMovies.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        filteredMovies: [],
        movie: null,
        loading: false,
        apiMessage: "",
      });
    });
  });

  // Search movies
  describe("searchMovies", () => {
    it("pending", () => {
      const action = { type: searchMovies.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        filteredMovies: [],
        movie: null,
        loading: true,
        apiMessage: "",
      });
    });

    it("fulfilled", () => {
      const action = { type: searchMovies.fulfilled.type, payload: moviesMock };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        filteredMovies: moviesMock.data,
        movie: null,
        loading: false,
        apiMessage: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: searchMovies.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        filteredMovies: [],
        movie: null,
        loading: false,
        apiMessage: "",
      });
    });
  });

  //fetch movie
  describe("fetchMovie", () => {
    it("pending", () => {
      const action = { type: fetchMovie.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        filteredMovies: [],
        movie: null,
        loading: true,
        apiMessage: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: fetchMovie.fulfilled.type,
        payload: movieMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        filteredMovies: [],
        movie: movieMock.data,
        loading: false,
        apiMessage: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: fetchMovie.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        filteredMovies: [],
        movie: null,
        loading: false,
        apiMessage: "",
      });
    });
  });

  //add movie
  describe("addMovie", () => {
    it("pending", () => {
      const action = { type: addMovie.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        filteredMovies: [],
        movie: null,
        loading: true,
        apiMessage: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: addMovie.fulfilled.type,
        payload: movieMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [movieMock.data],
        filteredMovies: [movieMock.data],
        movie: null,
        loading: false,
        apiMessage: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: addMovie.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        filteredMovies: [],
        movie: null,
        loading: false,
        apiMessage: "",
      });
    });
  });

  //edit movie
  describe("editMovie", () => {
    it("pending", () => {
      const action = { type: editMovie.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        filteredMovies: [],
        movie: null,
        loading: true,
        apiMessage: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: addMovie.fulfilled.type,
        payload: movieMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [movieMock.data],
        filteredMovies: [movieMock.data],
        movie: null,
        loading: false,
        apiMessage: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: editMovie.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        filteredMovies: [],
        movie: null,
        loading: false,
        apiMessage: "",
      });
    });
  });

  //delete movie
  describe("deleteMovie", () => {
    it("pending", () => {
      const action = { type: deleteMovie.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        filteredMovies: [],
        movie: null,
        loading: true,
        apiMessage: "",
      });
    });

    it("fulfilled", () => {
      const action = {
        type: deleteMovie.fulfilled.type,
        payload: movieMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        filteredMovies: [],
        movie: null,
        loading: false,
        apiMessage: "",
      });
    });

    it("rejected", () => {
      const action = {
        type: deleteMovie.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        movies: [],
        filteredMovies: [],
        movie: null,
        loading: false,
        apiMessage: "",
      });
    });
  });
});
