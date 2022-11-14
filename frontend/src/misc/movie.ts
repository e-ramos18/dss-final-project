import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMovie } from "../types";
import { getItem } from "../utils";
import api from "./api";

// Generates pending, fulfilled and rejected action types
export const fetchMovies = createAsyncThunk("movie/fetchMovies", async () => {
  const res = await api.get("/movies");
  return res.data;
});

export const searchMovies = createAsyncThunk(
  "movie/searchMovies",
  async (key: string) => {
    const res = await api.get(`/movies/${key}/search`);
    return res.data;
  }
);

export const fetchMovie = createAsyncThunk(
  "movie/fetchMovie",
  async (id: string) => {
    const res = await api.get(`/movies/${id}`);
    return res.data;
  }
);

export const addMovie = createAsyncThunk(
  "movie/addMovie",
  async (body: Partial<IMovie>) => {
    const token = getItem("token");
    const res = await api.post("/movies", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  }
);

export const editMovie = createAsyncThunk(
  "movie/editMovie",
  async (body: Partial<IMovie>) => {
    const token = getItem("token");
    const res = await api.patch(`/movies/${body.id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  }
);

export const deleteMovie = createAsyncThunk(
  "movie/deleteMovie",
  async (id: string) => {
    const token = getItem("token");
    const res = await api.delete(`/movies/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return res.data;
  }
);
