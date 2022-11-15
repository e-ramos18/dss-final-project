import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addActor,
  deleteActor,
  editActor,
  fetchActor,
  fetchActors,
  searchActors,
} from "../../misc/actor";
import { CustomApiResponse, IActor } from "../../types";

export type InitialState = {
  actors: IActor[];
  filteredActors: IActor[];
  actor: IActor | null;
  loading: boolean;
};
const initialState: InitialState = {
  actors: [],
  filteredActors: [],
  actor: null,
  loading: false,
};

const actorSlice = createSlice({
  name: "actor",
  initialState,
  reducers: {
    setFilteredActors(state, action) {
      state.filteredActors = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch actors
    builder.addCase(fetchActors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchActors.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        state.loading = false;
        state.actors = action.payload.data as IActor[];
        state.filteredActors = action.payload.data as IActor[];
      }
    );
    builder.addCase(fetchActors.rejected, (state, action) => {
      state.loading = false;
      state.actors = [];
      state.filteredActors = [];
    });

    // Search actors
    builder.addCase(searchActors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      searchActors.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        state.loading = false;
        state.filteredActors = action.payload.data as IActor[];
      }
    );
    builder.addCase(searchActors.rejected, (state, action) => {
      state.loading = false;
      state.actors = [];
    });

    // Fetch actor
    builder.addCase(fetchActor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchActor.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        state.loading = false;
        state.actor = action.payload.data as IActor;
      }
    );
    builder.addCase(fetchActor.rejected, (state, action) => {
      state.loading = false;
      state.actor = null;
    });

    // Add a actor
    builder.addCase(addActor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      addActor.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        state.loading = false;
        state.actors = state.actors.concat(action.payload.data as IActor);
        state.filteredActors = state.filteredActors.concat(
          action.payload.data as IActor
        );
      }
    );
    builder.addCase(addActor.rejected, (state, action) => {
      state.loading = false;
    });

    // Edit a actor
    builder.addCase(editActor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      editActor.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        state.loading = false;
        const newActors: IActor[] = [...state.actors];
        const data = action.payload.data as IActor;
        //finding index of the movie
        const index: number = newActors.findIndex((a) => a.id === data.id);
        newActors[index] = data;
        state.actors = newActors;
        state.filteredActors = newActors;
      }
    );
    builder.addCase(editActor.rejected, (state, action) => {
      state.loading = false;
    });

    // Delete a actor
    builder.addCase(deleteActor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteActor.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        const data = action.payload.data as string;
        const newUsers = state.actors.filter(
          (actor: IActor) => actor.id !== data
        );
        state.loading = false;
        state.actors = newUsers;
        state.filteredActors = newUsers;
      }
    );
    builder.addCase(deleteActor.rejected, (state) => {
      state.loading = false;
    });
  },
});
export const { setFilteredActors } = actorSlice.actions;
export default actorSlice.reducer;
