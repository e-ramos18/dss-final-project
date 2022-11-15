import reducer, { InitialState } from "../../features/actor/actorSlice";
import {
  addActor,
  deleteActor,
  editActor,
  fetchActor,
  fetchActors,
  searchActors,
} from "../../misc/actor";
import { actorMock, actorsMock } from "../../mocks/mockValues";

describe("Actor Slice ExtraReducers", () => {
  const initialState: InitialState = {
    actors: [],
    filteredActors: [],
    actor: null,
    loading: false,
  };

  // Fetch actors
  describe("fetchActors", () => {
    it("pending", () => {
      const action = { type: fetchActors.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        filteredActors: [],
        actor: null,
        loading: true,
      });
    });

    it("fulfilled", () => {
      const action = { type: fetchActors.fulfilled.type, payload: actorsMock };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: actorsMock.data,
        filteredActors: actorsMock.data,
        actor: null,
        loading: false,
      });
    });

    it("rejected", () => {
      const action = {
        type: fetchActors.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        filteredActors: [],
        actor: null,
        loading: false,
      });
    });
  });

  // Search actors
  describe("searchActors", () => {
    it("pending", () => {
      const action = { type: searchActors.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        filteredActors: [],
        actor: null,
        loading: true,
      });
    });

    it("fulfilled", () => {
      const action = { type: searchActors.fulfilled.type, payload: actorsMock };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        filteredActors: actorsMock.data,
        actor: null,
        loading: false,
      });
    });

    it("rejected", () => {
      const action = {
        type: searchActors.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        filteredActors: [],
        actor: null,
        loading: false,
      });
    });
  });

  // fetch actor
  describe("fetchActor", () => {
    it("pending", () => {
      const action = { type: fetchActor.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        filteredActors: [],
        actor: null,
        loading: true,
      });
    });

    it("fulfilled", () => {
      const action = { type: fetchActor.fulfilled.type, payload: actorMock };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        filteredActors: [],
        actor: actorMock.data,
        loading: false,
      });
    });

    it("rejected", () => {
      const action = {
        type: fetchActor.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        filteredActors: [],
        actor: null,
        loading: false,
      });
    });
  });

  // add actor
  describe("addActor", () => {
    it("pending", () => {
      const action = { type: addActor.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        filteredActors: [],
        actor: null,
        loading: true,
      });
    });

    it("fulfilled", () => {
      const action = { type: addActor.fulfilled.type, payload: actorMock };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [actorMock.data],
        filteredActors: [actorMock.data],
        actor: null,
        loading: false,
      });
    });

    it("rejected", () => {
      const action = {
        type: addActor.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        filteredActors: [],
        actor: null,
        loading: false,
      });
    });
  });

  // edit actor
  describe("editActor", () => {
    it("pending", () => {
      const action = { type: editActor.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        filteredActors: [],
        actor: null,
        loading: true,
      });
    });

    it("rejected", () => {
      const action = {
        type: editActor.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        filteredActors: [],
        actor: null,
        loading: false,
      });
    });
  });

  // delete actor
  describe("deleteActor", () => {
    it("pending", () => {
      const action = { type: deleteActor.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        filteredActors: [],
        actor: null,
        loading: true,
      });
    });

    it("fulfilled", () => {
      const action = { type: deleteActor.fulfilled.type, payload: actorMock };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        filteredActors: [],
        actor: null,
        loading: false,
      });
    });

    it("rejected", () => {
      const action = {
        type: deleteActor.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        actors: [],
        filteredActors: [],
        actor: null,
        loading: false,
      });
    });
  });
});
