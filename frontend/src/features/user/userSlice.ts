import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addUser,
  deleteUser,
  editUser,
  fetchUsers,
  searchUsers,
} from "../../misc/user";
import { CustomApiResponse, IUser } from "../../types";

export type InitialState = {
  users: IUser[];
  filteredUsers: IUser[];
  loading: boolean;
};
const initialState: InitialState = {
  users: [],
  filteredUsers: [],
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFilteredUsers(state, action) {
      state.filteredUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch users
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        state.loading = false;
        state.users = action.payload.data as IUser[];
        state.filteredUsers = action.payload.data as IUser[];
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.filteredUsers = [];
    });

    // Search users
    builder.addCase(searchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      searchUsers.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        state.loading = false;
        state.filteredUsers = action.payload.data as IUser[];
      }
    );
    builder.addCase(searchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
    });

    // Add a user
    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      addUser.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        state.loading = false;
        if (action.payload.data) {
          state.users = state.users.concat(action.payload.data as IUser);
          state.filteredUsers = state.filteredUsers.concat(
            action.payload.data as IUser
          );
        }
      }
    );
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
    });

    // Edit a user
    builder.addCase(editUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      editUser.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        state.loading = false;
        const newUsers: IUser[] = [...state.users];
        if (action.payload.data) {
          const data = action.payload.data as IUser;
          //finding index of the user
          const index: number = newUsers.findIndex((m) => m.id === data.id);
          newUsers[index] = data;
          state.users = newUsers;
          state.filteredUsers = newUsers;
        }
      }
    );
    builder.addCase(editUser.rejected, (state, action) => {
      state.loading = false;
    });

    // Delete a user
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteUser.fulfilled,
      (state, action: PayloadAction<CustomApiResponse<{}>>) => {
        if (action.payload.data) {
          const newUsers = state.users.filter(
            (user: IUser) => user.id !== (action.payload.data as string)
          );
          state.loading = false;
          state.users = newUsers;
          state.filteredUsers = newUsers;
        }
      }
    );
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { setFilteredUsers } = userSlice.actions;
export default userSlice.reducer;
