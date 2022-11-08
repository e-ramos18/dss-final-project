import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addActor,
  deleteActor,
  editActor,
  fetchActor,
  fetchActors,
} from "../../misc/actor";
import { IActor } from "../../types";

type InitialState = {
  actors: IActor[];
  filteredActors: IActor[];
  actor: IActor | null;
  loading: boolean;
  error: string;
};
const initialState: InitialState = {
  actors: [],
  filteredActors: [],
  actor: null,
  loading: false,
  error: "",
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
      (state, action: PayloadAction<IActor[]>) => {
        state.loading = false;
        state.actors = action.payload;
        state.filteredActors = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchActors.rejected, (state, action) => {
      state.loading = false;
      state.actors = [];
      state.filteredActors = [];
      state.error = action.error.message || "Something went wrong";
    });

    // Fetch actor
    builder.addCase(fetchActor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchActor.fulfilled,
      (state, action: PayloadAction<IActor>) => {
        state.loading = false;
        state.actor = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchActor.rejected, (state, action) => {
      state.loading = false;
      state.actor = null;
      state.error = action.error.message || "Something went wrong";
    });

    // Add a actor
    builder.addCase(addActor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      addActor.fulfilled,
      (state, action: PayloadAction<IActor>) => {
        state.loading = false;
        state.actors = state.actors.concat(action.payload);
        state.filteredActors = state.actors.concat(action.payload);
        state.error = "";
      }
    );
    builder.addCase(addActor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    // Edit a actor
    builder.addCase(editActor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      editActor.fulfilled,
      (state, action: PayloadAction<IActor>) => {
        state.loading = false;
        const newActors: IActor[] = [...state.actors];
        //finding index of the movie
        const index: number = newActors.findIndex(
          (a) => a.id === action.payload.id
        );
        newActors[index] = action.payload;
        state.actors = newActors;
        state.filteredActors = newActors;
        state.error = "";
      }
    );
    builder.addCase(editActor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });

    // Delete a actor
    builder.addCase(deleteActor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteActor.fulfilled,
      (state, action: PayloadAction<string>) => {
        const newUsers = state.actors.filter(
          (actor: IActor) => actor.id !== action.payload
        );
        state.loading = false;
        state.actors = newUsers;
        state.filteredActors = newUsers;
        state.error = "";
      }
    );
    builder.addCase(deleteActor.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});
export const { setFilteredActors } = actorSlice.actions;
export default actorSlice.reducer;
