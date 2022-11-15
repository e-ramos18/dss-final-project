import reducer, { InitialState } from "../../features/user/userSlice";
import {
  addUser,
  deleteUser,
  editUser,
  fetchUsers,
  searchUsers,
} from "../../misc/user";

import { userMock, usersMock } from "../../mocks/mockValues";

describe("User Slice ExtraReducers", () => {
  const initialState: InitialState = {
    users: [],
    filteredUsers: [],
    loading: false,
  };

  // Fetch users
  describe("fetchUsers", () => {
    it("pending", () => {
      const action = { type: fetchUsers.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        users: [],
        filteredUsers: [],
        loading: true,
      });
    });

    it("fulfilled", () => {
      const action = { type: fetchUsers.fulfilled.type, payload: usersMock };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        users: usersMock.data,
        filteredUsers: usersMock.data,
        loading: false,
      });
    });

    it("rejected", () => {
      const action = {
        type: fetchUsers.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        users: [],
        filteredUsers: [],
        loading: false,
      });
    });
  });

  // search users
  describe("searchUsers", () => {
    it("pending", () => {
      const action = { type: searchUsers.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        users: [],
        filteredUsers: [],
        loading: true,
      });
    });

    it("fulfilled", () => {
      const action = { type: searchUsers.fulfilled.type, payload: usersMock };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        users: [],
        filteredUsers: usersMock.data,
        loading: false,
      });
    });

    it("rejected", () => {
      const action = {
        type: searchUsers.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        users: [],
        filteredUsers: [],
        loading: false,
      });
    });
  });

  // add user
  describe("addUser", () => {
    it("pending", () => {
      const action = { type: addUser.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        users: [],
        filteredUsers: [],
        loading: true,
      });
    });

    it("fulfilled", () => {
      const action = { type: addUser.fulfilled.type, payload: userMock };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        users: [userMock.data],
        filteredUsers: [userMock.data],
        loading: false,
      });
    });

    it("rejected", () => {
      const action = {
        type: addUser.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        users: [],
        filteredUsers: [],
        loading: false,
      });
    });
  });

  // edit user
  describe("editUser", () => {
    it("pending", () => {
      const action = { type: editUser.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        users: [],
        filteredUsers: [],
        loading: true,
      });
    });

    it("rejected", () => {
      const action = {
        type: editUser.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        users: [],
        filteredUsers: [],
        loading: false,
      });
    });
  });

  // delete user
  describe("deleteUser", () => {
    it("pending", () => {
      const action = { type: deleteUser.pending.type };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        users: [],
        filteredUsers: [],
        loading: true,
      });
    });

    it("fulfilled", () => {
      const action = { type: deleteUser.fulfilled.type, payload: userMock };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        users: [],
        filteredUsers: [],
        loading: false,
      });
    });

    it("rejected", () => {
      const action = {
        type: deleteUser.rejected.type,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        users: [],
        filteredUsers: [],
        loading: false,
      });
    });
  });
});
